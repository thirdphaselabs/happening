import clerkClient from "@clerk/clerk-sdk-node";
import { TRPCError } from "@trpc/server";
import { AuthService } from "../auth/auth.service";
import { UserMetadataService } from "../user-metadata/user-metadata.service";
import { OnboardingPersistence } from "./onboarding.persistence";
import { UserRole } from "@prisma/client";
import { mapClerkRoleToUserRole, roleToClerkRole } from "../role/role-mapper";
import { AuthContext } from "../../trpc/procedures/protectedProcedure";

export enum OnboardingStep {
  Welcome = "Welcome",
  Profile = "Profile",
  CreateCompany = "CreateCompany",
  InviteTeam = "InviteTeam",
  Complete = "Complete",
}

const onboardingPersistence = new OnboardingPersistence();
const authService = new AuthService();
const userMetadataService = new UserMetadataService();

export class OnboardingService {
  async beginOnboarding(
    auth: AuthContext,
    { organisations }: { organisations: { orgId: string; orgMembershipId: string }[] },
  ) {
    if (organisations.length > 1) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User can only be part of one organization",
      });
    }

    const organisation = organisations[0];

    if (organisation) {
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

      await userMetadataService.addRole(auth.userId, mapClerkRoleToUserRole(orgMembership.role));
    }

    await onboardingPersistence.beginOnboarding(auth.userId);

    const nextStep = await this.updateToNextStep(auth);

    return {
      nextStep,
    };
  }
  async inviteTeamMembers(auth: AuthContext, input: { invites: {  email: string }[] }) {
    try {
      const organisation = await onboardingPersistence.getOrganisation(auth.userId);

      if (!organisation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      await Promise.all(
        input.invites.map(async (invite) => {
          clerkClient.organizations.createOrganizationInvitation({
            organizationId: organisation.clerkOrganisationId,
            emailAddress: invite.email,
            inviterUserId: auth.userId,
            role: roleToClerkRole(UserRole.ORGANIZER),
          });
        }),
      );
      const nextStep = await this.updateToNextStep(auth);

      return {
        nextStep,
      };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while inviting team members",
      });
    }
  }

  async createOrganization(auth: AuthContext, { name }: { name: string }) {
    try {
      const clerkUser = await clerkClient.users.getUser(auth.userId);

      const clerkOrganization = await clerkClient.organizations.createOrganization({
        name,
        createdBy: clerkUser.id,
      });

      await onboardingPersistence.createOrganization(auth.userId, {
        clerkOrganizationId: clerkOrganization.id,
        name,
      });

      const nextStep = await this.updateToNextStep(auth);

      return {
        nextStep,
      };
      // return clerkOrganization;
    } catch (error) {
      console.log(error);
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
      console.log(error);
      throw new Error("An error occurred while resetting onboarding");
    }
  }
  async completePersonalDetails(
    auth: AuthContext,
    input: {
      firstName: string;
      lastName: string;
      role: string;
      organisations: { orgId: string; orgMembershipId: string }[];
    },
  ) {
    try {
      await onboardingPersistence.completePersonalDetails(auth.userId, input);
      const nextStep = await this.updateToNextStep(auth);
      return {
        nextStep,
      };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while completing personal details",
      });
    }
  }

  async getCurrentOnboardingStep(auth: AuthContext) {
    try {
      return {
        onboardingStep: auth.onboardingStep,
      };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching onboarding step",
      });
    }
  }

  async completeCurrentOnboardingStep(auth: AuthContext) {
    try {
      const nextStep = this.computeNextStepAdmin(auth.onboardingStep || OnboardingStep.Welcome);

      await userMetadataService.updateOnboardingStep(auth.userId, nextStep);

      return {
        nextStep,
      };
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while updating onboarding step");
    }
  }

  async completeOnboarding(
    { userId }: AuthContext,
    { organisations }: { organisations: { orgId: string; orgMembershipId: string }[] },
  ) {
    try {
      const { firstName, lastName, role } = await onboardingPersistence.getOnboarding(userId);
      if (!firstName || !lastName || !role) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Personal details are missing",
        });
      }
      await authService.createUser(userId, { firstName, lastName, role, organisations });
      await userMetadataService.completeOnboarding(userId);
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while completing onboarding");
    }
  }

  private async updateToNextStep({ userId, role, onboardingStep }: AuthContext) {
    if (role === UserRole.MEMBER) {
      const nextStep = this.computeNextStep(onboardingStep);

      await userMetadataService.updateOnboardingStep(userId, nextStep);

      return nextStep;
    }

    const nextStep = this.computeNextStepAdmin(onboardingStep);

    await userMetadataService.updateOnboardingStep(userId, nextStep);

    return nextStep;
  }

  private computeNextStepAdmin(currentStep: OnboardingStep): OnboardingStep {
    switch (currentStep) {
      case OnboardingStep.Welcome:
        return OnboardingStep.Profile;
      case OnboardingStep.Profile:
        return OnboardingStep.CreateCompany;
      case OnboardingStep.CreateCompany:
        return OnboardingStep.InviteTeam;
      case OnboardingStep.InviteTeam:
        return OnboardingStep.Complete;
      case OnboardingStep.Complete:
        return OnboardingStep.Complete;
    }
  }

  private computeNextStep(currentStep: OnboardingStep): OnboardingStep {
    switch (currentStep) {
      case OnboardingStep.Welcome:
        return OnboardingStep.Profile;
      case OnboardingStep.Profile:
        return OnboardingStep.Complete;
      default:
        throw new Error("Invalid onboarding step");
    }
  }
}
