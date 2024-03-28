import { z } from "zod";
import { createTRPCRouter } from "../../trpc/context";
import { protectedProcedure, publicProcedure } from "../../trpc/procedures";
import { PlaventiEvent } from "./event.model";
import { EventService } from "./event.service";

const eventService = new EventService();

export const eventsRouter = createTRPCRouter({
  all: protectedProcedure.output(z.array(PlaventiEvent)).query(async () => {
    return eventService.get();
  }),
  
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .output(PlaventiEvent)
    .mutation(({ input: { title } }) => {
      return eventService.create({ title });
    }),
});
