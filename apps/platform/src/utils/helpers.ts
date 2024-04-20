import type { OnboardingStep } from "~/trpc/types";

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function never(message: string): never {
  throw new Error(`Unexpected: ${message}`);
}

export function computeOnboardingPath(onboardingStep: unknown) {
  switch (onboardingStep) {
    case "Profile":
      return "/onboarding/profile";
    case "CreateCompany":
      return "/onboarding/company";
    case "InviteTeam":
    case "Complete":
      return "/onboarding/invite";
    default:
      return "/onboarding/profile";
  }
}

export function computeOnboardingStepFromPath(path: string): OnboardingStep {
  switch (path) {
    case "/onboarding/profile":
      return "Profile" as OnboardingStep;
    case "/onboarding/company":
      return "CreateCompany" as OnboardingStep;
    case "/onboarding/invite":
      return "InviteTeam" as OnboardingStep;
    default:
      return "Profile" as OnboardingStep;
  }
}
