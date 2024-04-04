import { AppRouter } from "@plaventi/server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type Event = RouterOutput["event"]["all"][number];
