import clerkClient from "@clerk/clerk-sdk-node";
import { TRPCError } from "@trpc/server";
import { mapClerkRoleToUserRole } from "../role/role-mapper";
import { AuthPersistence } from "./auth.persistance";
import WorkOS, { User } from "@workos-inc/node";
import { environment } from "../../environment";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { sealData } from "iron-session";
import { PlaventiSession } from "./auth.controller";
import { profileInclude } from "../profile/entities/profile.entity";
import { prisma } from "@plaventi/database";
import { assertError } from "../../helpers/utils";
import { parseWorkOSError } from "./helpers/workos-error-parser";
import Stripe from "stripe";

export enum AuthenticationMethod {
  Email = "email",
  Google = "google",
}

const authPersistence = new AuthPersistence();

const workos = new WorkOS(environment.WORKOS_API_KEY);

const JWKS = createRemoteJWKSet(new URL(workos.userManagement.getJwksUrl(environment.WORKOS_CLIENT_ID)));

const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

const { API_URL, APP_URL } = environment;

export class AuthService {
  async loginWithGoogleUrl(): Promise<{ url: string }> {
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: "GoogleOAuth",
      redirectUri: `${API_URL}/api/auth/callback`,
      clientId: environment.WORKOS_CLIENT_ID,
    });

    return {
      url: authorizationUrl,
    };
  }
  async signIn(args: { email: string; password: string }) {
    try {
      const response = await workos.userManagement.authenticateWithPassword({
        clientId: process.env.WORKOS_CLIENT_ID || "",
        email: String(args.email),
        password: String(args.password),
      });

      const decodedAccessToken = await jwtVerify(response.accessToken, JWKS);
      const sessionId = decodedAccessToken.payload.sid as string;

      const profile = await prisma.profile.findUnique({
        where: {
          workosId: response.user.id,
        },
        include: profileInclude,
      });

      if (!profile) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No user profile found",
        });
      }

      const sessionData: PlaventiSession = {
        sessionId: sessionId,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
        impersonator: response.impersonator,
        profile,
        organisationId: profile.team?.workosOrganisationId ?? null,
      };

      const encryptedSession = await sealData(sessionData, { password: environment.WORKOS_COOKIE_PASSWORD });

      return { success: true, encryptedSession };
    } catch (error) {
      const { code, message, status } = parseWorkOSError(error);

      console.error("Error signing in", error);
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: code,
      });
    }
  }

  async signUp(args: { email: string; password: string }) {
    const user = await workos.userManagement.createUser({
      email: args.email,
      password: args.password,
    });

    await workos.userManagement.sendVerificationEmail({
      userId: user.id,
    });

    return user;
  }

  async resendVerificationEmail(userId: string) {
    await workos.userManagement.sendVerificationEmail({
      userId,
    });
  }

  async verifyEmail({ userId, code }: { userId: string; code: string }) {
    const { user } = await workos.userManagement.verifyEmail({
      userId,
      code,
    });
  }

  async verifyEmailAndAuthenticate({ userId, code }: { userId: string; code: string }) {
    await workos.userManagement.authenticateWithEmailVerification({
      code,
      clientId: environment.WORKOS_CLIENT_ID,
      pendingAuthenticationToken: userId,
    });
  }

  async getUser(clerkUserId: string) {
    try {
      const user = await authPersistence.getUserByClerkId(clerkUserId);
      return user;
    } catch (error) {
      return null;
    }
  }
  async getActiveOrganization(userId: string) {
    try {
      const organisation = await authPersistence.getOrganizationByUserId(userId);

      if (!organisation) return null;

      return organisation;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching active organization",
      });
    }
  }
  async createProfile(user: User) {
    try {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
      });

      const profile = await authPersistence.createProfile({
        workosUserId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        stripeCustomerId: stripeCustomer.id,
      });

      return profile;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while creating user",
      });
    }
  }
  async completeOnboarding(userId: any) {
    try {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          onboardingComplete: true,
        },
      });
    } catch (error) {
      throw new Error("An error occurred while completing onboarding");
    }
  }
  async isEmailAssociatedWithUser(email: string) {
    const users = await workos.userManagement.listUsers({
      email: email,
    });

    const user = users.data[0];

    if (!user) {
      return {
        isAssociated: false,
        isEmailVerified: false,
        userId: null,
      } as const;
    }

    if (user.emailVerified) {
      return {
        isAssociated: true,
        isEmailVerified: true,
        userId: user.id,
      } as const;
    }

    await workos.userManagement.sendVerificationEmail({
      userId: user.id,
    });

    return {
      isAssociated: true,
      isEmailVerified: user.emailVerified,
      userId: user.id,
    } as const;
  }
}
