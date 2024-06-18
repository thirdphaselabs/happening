import clerkClient from "@clerk/clerk-sdk-node";
import { OnboardingStatus, Profile } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { PlaventiSession } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { TeamService } from "../team/team.service";
import { OnboardingPersistence } from "./onboarding.persistence";

import { DomainDataState, WorkOS } from "@workos-inc/node";
import { environment } from "../../environment";

const workos = new WorkOS(environment.WORKOS_API_KEY);

export class OnboardingService {
  private readonly authService: AuthService;
  private readonly teamService: TeamService;
  private readonly onboardingPersistence: OnboardingPersistence;

  constructor() {
    this.authService = new AuthService();
    this.teamService = new TeamService();
    this.onboardingPersistence = new OnboardingPersistence();
  }

  async inviteTeamMembers(auth: PlaventiSession, input: { invites: { email: string }[] }) {
    try {
      if (!auth.organisationId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Organization not found",
        });
      }

      const emails = input.invites.map((invite) => invite.email);

      await this.teamService.sendInviteToTeam(auth, auth.organisationId, emails);

      await this.completeOnboarding(auth);

      const nextStep = await this.updateToNextStep(auth);

      return {
        nextStep,
      };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while inviting team members",
      });
    }
  }

  async createOrganization(auth: PlaventiSession, args: { name: string; domain: string }) {
    try {
      const hasCreatedTeam = await this.teamService.hasUserCreatedTeam(auth);

      if (!hasCreatedTeam) {
        await this.teamService.createTeam(auth, args);
      }

      const nextStep = await this.updateToNextStep(auth);

      return {
        nextStep,
      };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while creating organization",
      });
    }
  }
  async resetOnboarding(auth: PlaventiSession) {
    try {
      // await userMetadataService.resetOnboardingMetadata(auth.userId);
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
      await workos.userManagement.updateUser({
        userId: auth.user.id,
        firstName: input.firstName,
        lastName: input.lastName,
      });
      await this.onboardingPersistence.completePersonalDetails(auth.profile.id, input);
      const nextStep = await this.updateToNextStep(auth);
      return {
        nextStep,
      };
    } catch (error) {
      console.error(error);
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

      await this.onboardingPersistence.updateToNextStep(session.user.id, nextStep);

      return {
        nextStep,
      };
    } catch (error) {
      throw new Error("An error occurred while updating onboarding step");
    }
  }

  async completeOnboarding(session: PlaventiSession) {
    try {
      await this.updateToNextStep(session);
    } catch (error) {
      throw new Error("An error occurred while completing onboarding");
    }
  }

  private async updateToNextStep({ profile }: PlaventiSession) {
    const nextStep = this.computeNextStep(profile);

    await this.onboardingPersistence.updateToNextStep(profile.id, nextStep);

    return nextStep;
  }

  private computeNextStep(profile: Profile | null): OnboardingStatus {
    if (!profile) return OnboardingStatus.PROFILE;

    switch (profile.onboardingStatus) {
      case OnboardingStatus.PROFILE:
        return OnboardingStatus.TEAM;
      case OnboardingStatus.TEAM:
        return OnboardingStatus.INVITE;
      case OnboardingStatus.INVITE:
        return OnboardingStatus.COMPLETED;
      case OnboardingStatus.COMPLETED:
        return OnboardingStatus.COMPLETED;
    }
  }
}
