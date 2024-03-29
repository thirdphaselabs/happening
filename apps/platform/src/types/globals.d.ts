import { OnboardingStep, Role } from "~/trpc/types";

declare global {
  export interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      onboardingStep?: OnboardingStep;
      role?: Role;
    };
  }

  export interface UserPublicMetadata {
    onboardingComplete?: boolean;
    onboardingStep?: OnboardingStep;
  }
}

export {};
