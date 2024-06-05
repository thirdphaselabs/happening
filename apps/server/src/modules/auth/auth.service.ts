import clerkClient from "@clerk/clerk-sdk-node";
import { TRPCError } from "@trpc/server";
import { mapClerkRoleToUserRole } from "../role/role-mapper";
import { AuthPersistence } from "./auth.persistance";
import { User } from "@workos-inc/node";

export enum AuthenticationMethod {
  Email = "email",
  Google = "google",
}

const authPersistence = new AuthPersistence();

export class AuthService {
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
      const profile = await authPersistence.createUser({
        workosUserId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
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
    const userList = await clerkClient.users.getUserList();

    const user = userList.find((user) => user.emailAddresses.map((e) => e.emailAddress).includes(email));

    if (!user)
      return {
        isAssociated: false,
        method: null,
      };

    const isGoogleAuth = user.externalAccounts.length > 0;

    return {
      isAssociated: true,
      method: isGoogleAuth ? AuthenticationMethod.Google : AuthenticationMethod.Email,
    };
  }
}
