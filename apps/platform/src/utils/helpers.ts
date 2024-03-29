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
    case "Welcome":
      return "/onboarding/welcome";
    case "Profile":
      return "/onboarding/profile";
    case "CreateCompany":
      return "/onboarding/company";
    case "InviteTeam":
      return "/onboarding/invite";
    case "Complete":
      return "/onboarding/complete";
    default:
      return "/onboarding/welcome";
  }
}

export function computeOnboardingStepFromPath(path: string): OnboardingStep {
  switch (path) {
    case "/onboarding/welcome":
      return "Welcome" as OnboardingStep;
    case "/onboarding/profile":
      return "Profile" as OnboardingStep;
    case "/onboarding/company":
      return "CreateCompany" as OnboardingStep;
    case "/onboarding/invite":
      return "InviteTeam" as OnboardingStep;
    case "/onboarding/complete":
      return "Complete" as OnboardingStep;
    default:
      return "Welcome" as OnboardingStep;
  }
}
