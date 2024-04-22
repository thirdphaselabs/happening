import clerkClient from "@clerk/clerk-sdk-node";
import { z } from "zod";
import { OnboardingStep } from "../../types/types";

export const userPublicMetadataSchema = z.object({
  onboardingComplete: z.boolean().optional(),
  onboardingStep: z.nativeEnum(OnboardingStep).optional(),
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

    console.log({ metadata });

    const updatedMetadata: UserPublicMetadata = {
      ...(metadata.publicMetadata ?? {}),
      ...update,
    };

    const met: UserPublicMetadata = {
      onboardingComplete: true,
      onboardingStep: OnboardingStep.Profile,
    };

    console.log({ updatedMetadata });

    const parsedMetadata = userPublicMetadataSchema.parse(met);

    console.log({ parsedMetadata });

    await clerkClient.users.updateUser(userId, {
      publicMetadata: parsedMetadata,
    });
  }
}
