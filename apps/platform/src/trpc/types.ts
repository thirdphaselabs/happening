import type { AppRouter } from "@plaventi/server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type OnboardingStatus = RouterOutput["onboarding"]["getCurrentOnboardingStep"]["onboardingStep"];
export type PlaventiEvent = RouterOutput["event"]["byIdentifier"];

export type CreateEventInput = RouterInput["event"]["create"];

export type Session = RouterOutput["auth"]["session"];

export type Attending = RouterOutput["profile"]["attending"];

export type PageParams<K extends string> = {
  params: {
    [P in K]?: string;
  };
};
