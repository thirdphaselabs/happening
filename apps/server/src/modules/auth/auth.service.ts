import clerkClient, { OrganizationMembership, organizations } from "@clerk/clerk-sdk-node";
import { AuthPersistence as AuthPersistence } from "./auth.persistance";
import { TRPCError } from "@trpc/server";
import { UserRole } from "@prisma/client";
import { UserMetadataService } from "../user-metadata/user-metadata.service";
import { mapClerkRoleToUserRole } from "../role/role-mapper";

export enum AuthenticationMethod {
  Email = "email",
  Google = "google",
}

const authPersistence = new AuthPersistence();
const userMetadataService = new UserMetadataService();

export class AuthService {
  async getClerkRole(clerkUserId: string) {
    try {
      const user = await userMetadataService.getMetadata(clerkUserId);
      return user.role;
    } catch (error) {
      return null;
    }
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
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching active organization",
      });
    }
  }
  async createUser(
    clerkId: string,
    args: {
      firstName: string;
      lastName: string;
      organisations: { orgId: string; orgMembershipId: string }[];
    },
  ) {
    try {
      if (args.organisations.length > 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only be part of one organization",
        });
      }

      const organisation = args.organisations[0];

      if (!organisation) {
        throw new Error("Organisation not found");
      }

      const organisationMembers = await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: organisation.orgId,
      });

      const orgMembership = organisationMembers.find((member) => member.id === organisation.orgMembershipId);

      if (!orgMembership) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User is not part of the organization",
        });
      }

      const user = await authPersistence.createUser({
        clerkId,
        firstName: args.firstName,
        lastName: args.lastName,
        clerkOrganisationId: organisation.orgId,
        userRole: mapClerkRoleToUserRole(orgMembership.role),
      });

      return user;
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
