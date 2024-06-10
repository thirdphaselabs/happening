import type { OnboardingStatus } from "~/trpc/types";
import { Routes } from "./routing/routes";

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
      return Routes.Onboarding.Profile;
    case "TEAM":
      return Routes.Onboarding.Team;
    case "INVITE":
      return Routes.Onboarding.Invite;
    case "COMPLETED":
      return Routes.Dashboard;
  }
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}
