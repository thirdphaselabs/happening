import clerkClient from "@clerk/clerk-sdk-node";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { OnboardingStep } from "../onboarding/onboarding.service";

export const userPublicMetadataSchema = z.object({
  onboardingComplete: z.boolean().optional(),
  onboardingStep: z.nativeEnum(OnboardingStep).optional(),
  role: z.nativeEnum(UserRole).optional(),
});
export type UserPublicMetadata = z.infer<typeof userPublicMetadataSchema>;

export class UserMetadataService {
  async getMetadata(userId: string): Promise<UserPublicMetadata> {
    const metadata = await clerkClient.users.getUser(userId);

    return userPublicMetadataSchema.parse(metadata.publicMetadata);
  }

  async resetOnboardingMetadata(userId: string) {
    await this.updateWithExistingMetadata(userId, {
      onboardingComplete: false,
      onboardingStep: OnboardingStep.Profile,
    });
  }
  async addRole(userId: string, role: UserRole) {
    await this.updateWithExistingMetadata(userId, {
      role,
    });
  }

  async updateOnboardingStep(userId: string, step: OnboardingStep) {
    await this.updateWithExistingMetadata(userId, {
      onboardingStep: step,
    });
  }

  async completeOnboarding(userId: string) {
    await this.updateWithExistingMetadata(userId, {
      onboardingComplete: true,
    });
  }

  private async updateWithExistingMetadata(userId: string, update: Partial<UserPublicMetadata>) {
    const metadata = await clerkClient.users.getUser(userId);

    const updatedMetadata: UserPublicMetadata = {
      ...metadata.publicMetadata,
      ...update,
    };

    const parsedMetadata = userPublicMetadataSchema.parse(updatedMetadata);

    await clerkClient.users.updateUser(userId, {
      publicMetadata: parsedMetadata,
    });
  }
}
