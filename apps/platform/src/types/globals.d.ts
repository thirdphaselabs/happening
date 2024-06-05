import { OnboardingStatus, Role } from "~/trpc/types";

declare global {
  export interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      onboardingStep?: OnboardingStatus;
      role?: Role;
    };
  }

  export interface UserPublicMetadata {
    onboardingComplete?: boolean;
    onboardingStep?: OnboardingStatus;
  }
}

export {};
