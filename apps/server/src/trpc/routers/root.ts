import { authRouter } from "../../modules/auth/auth.router";
import { onboardingRouter } from "../../modules/onboarding/onboarding.router";
import { teamRouter } from "../../modules/team/team.router";
import { waitlistRouter } from "../../modules/waitlist/waitlist.router";
import { eventsRouter } from "../../modules/event-management/event.router";
import { eventDiscoveryRouter } from "../../modules/event-discovery/event-discovery.router";
import { createTRPCRouter } from "../context";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  onboarding: onboardingRouter,
  team: teamRouter,
  waitlist: waitlistRouter,
  event: eventsRouter,
  eventDiscovery: eventDiscoveryRouter,
});

export type AppRouter = typeof appRouter;
