import { eventsRouter } from "../../modules/event/event.router";
import { waitlistRouter } from "../../modules/waitlist/waitlist.router";
import { createTRPCRouter } from "../context";
import { authRouter } from "../../modules/auth/auth.router";
import { onboardingRouter } from "../../modules/onboarding/onboarding.router";

export const appRouter = createTRPCRouter({
  event: eventsRouter,
  auth: authRouter,
  onboarding: onboardingRouter,
  waitlist: waitlistRouter,
});

export type AppRouter = typeof appRouter;
