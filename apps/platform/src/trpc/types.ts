import type { AppRouter } from "@plaventi/server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type OnboardingStep = RouterOutput["onboarding"]["getCurrentOnboardingStep"]["onboardingStep"];
export type PlaventiEvent = RouterOutput["event"]["byIdentifier"];

export type PageParams<K extends string> = {
  params: {
    [P in K]?: string;
  };
};
