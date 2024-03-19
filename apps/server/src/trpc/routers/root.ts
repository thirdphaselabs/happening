import { eventsRouter } from "../../modules/event/event.router";
import { waitlistRouter } from "../../modules/waitlist/waitlist.router";
import { createTRPCRouter } from "../context";

export const appRouter = createTRPCRouter({
  event: eventsRouter,
  waitlist: waitlistRouter,
});

export type AppRouter = typeof appRouter;
