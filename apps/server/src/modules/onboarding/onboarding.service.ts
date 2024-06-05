import clerkClient from "@clerk/clerk-sdk-node";
import { OnboardingStatus, Profile } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { PlaventiSession } from "../../controllers/auth.controller";
import { AuthContext } from "../../trpc/procedures/adminProcedures";
import { AuthService } from "../auth/auth.service";
import { UserMetadataService } from "../user-metadata/user-metadata.service";
import { OnboardingPersistence } from "./onboarding.persistence";

const onboardingPersistence = new OnboardingPersistence();
const authService = new AuthService();
const userMetadataService = new UserMetadataService();

export class OnboardingService {
  async beginOnboarding(auth: PlaventiSession) {
    // if (organisations.length > 1) {
    //   throw new TRPCError({
    //     code: "BAD_REQUEST",
    //     message: "User can only be part of one organization",
    //   });
    // }

    // const organisation = organisations[0];

    // if (organisation) {
    //   const organisationMembers = await clerkClient.organizations.getOrganizationMembershipList({
    //     organizationId: organisation.orgId,
    //   });

    //   const orgMembership = organisationMembers.find((member) => member.id === organisation.orgMembershipId);

    //   if (!orgMembership) {
    //     throw new TRPCError({
    //       code: "BAD_REQUEST",
    //       message: "User is not part of the organization",
    //     });
    //   }
    // }

    await onboardingPersistence.beginOnboarding(auth.user.id);
  }
  async inviteTeamMembers(
    auth: PlaventiSession,
    input: { invites: { email: string }[]; organisations: { orgId: string; orgMembershipId: string }[] },
  ) {
    try {
      const organisation = await onboardingPersistence.getOrganisation(auth.user.id);

      if (!organisation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      // await Promise.all(
      //   input.invites.map(async (invite) => {
      //     clerkClient.organizations.createOrganizationInvitation({
      //       organizationId: organisation.clerkOrganisationId,
      //       emailAddress: invite.email,
      //       inviterUserId: auth.userId,
      //       role: roleToClerkRole(UserRole.ORGANIZER),
      //     });
      //   }),
      // );

      await this.completeOnboarding(auth, { organisations: input.organisations });

      const nextStep = await this.updateToNextStep(auth);

      return {
        nextStep,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while inviting team members",
      });
    }
  }

  async createOrganization(auth: PlaventiSession, { name, domain }: { name: string; domain: string }) {
    try {
      const clerkUser = await clerkClient.users.getUser(auth.user.id);

      const clerkOrganization = await clerkClient.organizations.createOrganization({
        name,
        createdBy: clerkUser.id,
      });

      await onboardingPersistence.createOrganization(auth.user.id, {
        workosOrganizationId: clerkOrganization.id,
        name,
        domain,
      });

      const nextStep = await this.updateToNextStep(auth);

      return {
        nextStep,
      };
      // return clerkOrganization;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while creating organization",
      });
    }
  }
  async resetOnboarding(auth: AuthContext) {
    try {
      await userMetadataService.resetOnboardingMetadata(auth.userId);
    } catch (error) {
      throw new Error("An error occurred while resetting onboarding");
    }
  }
  async completePersonalDetails(
    auth: PlaventiSession,
    input: {
      firstName: string;
      lastName: string;
    },
  ) {
    try {
      await onboardingPersistence.completePersonalDetails(auth.user.id, input);
      const nextStep = await this.updateToNextStep(auth);
      return {
        nextStep,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while completing personal details",
      });
    }
  }

  async getCurrentOnboardingStep(auth: PlaventiSession) {
    try {
      return {
        onboardingStep: auth.profile?.onboardingStatus || OnboardingStatus.PROFILE,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching onboarding step",
      });
    }
  }

  async completeCurrentOnboardingStep(session: PlaventiSession) {
    try {
      const nextStep = this.computeNextStep(session.profile);

      await userMetadataService.updateOnboardingStep(session.user.id, nextStep);

      return {
        nextStep,
      };
    } catch (error) {
      throw new Error("An error occurred while updating onboarding step");
    }
  }

  async completeOnboarding(
    { user }: PlaventiSession,
    { organisations }: { organisations: { orgId: string; orgMembershipId: string }[] },
  ) {
    try {
      const { firstName, lastName } = await onboardingPersistence.getOnboarding(user.id);
      if (!firstName || !lastName) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Personal details are missing",
        });
      }
      await authService.createUser(user.id, { firstName, lastName, organisations });
      await userMetadataService.completeOnboarding(user.id);
    } catch (error) {
      throw new Error("An error occurred while completing onboarding");
    }
  }

  private async updateToNextStep({ user, profile }: PlaventiSession) {
    const nextStep = this.computeNextStep(profile);

    await userMetadataService.updateOnboardingStep(user.id, nextStep);

    return nextStep;
  }

  private computeNextStep(profile: Profile | null): OnboardingStatus {
    if (!profile) return OnboardingStatus.PROFILE;

    switch (profile.onboardingStatus) {
      case OnboardingStatus.PROFILE:
        return OnboardingStatus.ORGANISATION;
      case OnboardingStatus.ORGANISATION:
        return OnboardingStatus.INVITE;
      case OnboardingStatus.INVITE:
        return OnboardingStatus.COMPLETE;
      case OnboardingStatus.COMPLETE:
        return OnboardingStatus.COMPLETED;
      case OnboardingStatus.COMPLETED:
        return OnboardingStatus.COMPLETED;
    }
  }
}
