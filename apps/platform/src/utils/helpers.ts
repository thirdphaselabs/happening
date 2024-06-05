import type { OnboardingStatus } from "~/trpc/types";

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function never(message: string): never {
  throw new Error(`Unexpected: ${message}`);
}

export function computeOnboardingPath(onboardingStep: OnboardingStatus) {
  switch (onboardingStep) {
    case "PROFILE":
      return "/onboarding/profile";
    case "TEAM":
      return "/onboarding/team";
    case "INVITE":
      return "/onboarding/invite";
    case "COMPLETED":
      return "/";
  }
}
