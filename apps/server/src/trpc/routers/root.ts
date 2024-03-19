import { eventsRouter } from "../../modules/event/event.route";
import { createTRPCRouter } from "../context";

// Create routes in /routers and add them in appRouter/index.ts
export const appRouter = createTRPCRouter({
  // Add new routes here
  event: eventsRouter,
});

export type AppRouter = typeof appRouter;
