import { authRouter } from "../../modules/auth/auth.router";
import { onboardingRouter } from "../../modules/onboarding/onboarding.router";
import { waitlistRouter } from "../../modules/waitlist/waitlist.router";
import { eventsRouter } from "../../modules/event/event.router";
import { createTRPCRouter } from "../context";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  onboarding: onboardingRouter,
  waitlist: waitlistRouter,
  event: eventsRouter,
});

export type AppRouter = typeof appRouter;
