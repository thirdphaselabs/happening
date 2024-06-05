import { authOrg } from "../../helpers/orgAuth";
import { createTRPCRouter } from "../../trpc/context";
import { organisationProcedure } from "../../trpc/procedures/adminProcedures";
import { createEventDTO } from "./dto/create-event.dto";
import { eventDTO, eventDTOs } from "./dto/event.dto";
import { getEventDTO } from "./dto/get-event.dto";
import { updateEventDTO } from "./dto/update-event.dto";
import { EventService } from "./event.service";
import { toEventDTO } from "./mappers/toEventDTO.mapper";
import { throwOnNotFound } from "../../helpers/throw-on-not-found";
import { workOsProcedure } from "../../trpc/procedures";
import { workOsWithOrgProcedure } from "../../trpc/procedures/workOsProcedure";

const eventService = new EventService();

export const eventsRouter = createTRPCRouter({
  all: workOsWithOrgProcedure.output(eventDTOs).query(async ({ ctx }) => {
    const events = await eventService.get(ctx.session);

    return events.map(toEventDTO);
  }),

  byIdentifier: organisationProcedure
    .input(getEventDTO)
    .output(eventDTO)
    .query(async ({ ctx, input }) => {
      const event = await eventService.getByIdentifier(authOrg(ctx.auth), input);

      throwOnNotFound(event, "Event not found");

      return toEventDTO(event);
    }),

  create: organisationProcedure
    .input(eventDTO.omit({ identifier: true }))
    .output(eventDTO)
    .mutation(async ({ ctx, input }) => {
      const event = await eventService.create(authOrg(ctx.auth), input);
      return toEventDTO(event);
    }),

  update: organisationProcedure
    .input(updateEventDTO)
    .output(eventDTO)
    .mutation(async ({ ctx, input }) => {
      const event = await eventService.update(authOrg(ctx.auth), input);
      // wait 4 seconds
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return toEventDTO(event);
    }),
});
