import { z } from "zod";
import { authOrg } from "../../helpers/orgAuth";
import { organisationProcedure } from "../../trpc/procedures/adminProcedures";
import { createTRPCRouter } from "../../trpc/context";
import { PlaventiEvent } from "./event.model";
import { EventService } from "./event.service";

const eventService = new EventService();

export const eventsRouter = createTRPCRouter({
  all: organisationProcedure.query(async ({ ctx }) => {
    const events = await eventService.get(authOrg(ctx.auth));

    return events;
  }),

  create: organisationProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .output(PlaventiEvent)
    .mutation(({ ctx, input: { title } }) => {
      return eventService.create(authOrg(ctx.auth), { title });
    }),
});
