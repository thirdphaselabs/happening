import { throwOnNotFound } from "../../helpers/throw-on-not-found";
import { createTRPCRouter } from "../../trpc/context";
import { workOsWithOrgProcedure } from "../../trpc/procedures/workOsProcedure";
import { createEventDTO } from "./dto/create-event.dto";
import { eventDTO, eventDTOs } from "./dto/event.dto";
import { getEventDTO } from "./dto/get-event.dto";
import { updateEventDTO } from "./dto/update-event.dto";
import { EventManagementService } from "./event.service";
import { toEventDTO } from "./mappers/toEventDTO.mapper";

const eventService = new EventManagementService();

export const eventsRouter = createTRPCRouter({
  all: workOsWithOrgProcedure.output(eventDTOs).query(async ({ ctx }) => {
    const events = await eventService.get(ctx.session);

    return events.map(toEventDTO);
  }),

  byIdentifier: workOsWithOrgProcedure
    .input(getEventDTO)
    .output(eventDTO)
    .query(async ({ ctx, input }) => {
      const event = await eventService.getByIdentifier(ctx.session, input);

      throwOnNotFound(event, "Event not found");

      return toEventDTO(event);
    }),

  create: workOsWithOrgProcedure
    .input(createEventDTO.omit({ identifier: true }))
    .output(eventDTO)
    .mutation(async ({ ctx, input }) => {
      const event = await eventService.create(ctx.session, input);
      return toEventDTO(event);
    }),

  update: workOsWithOrgProcedure
    .input(updateEventDTO)
    .output(eventDTO)
    .mutation(async ({ ctx, input }) => {
      const event = await eventService.update(ctx.session, input);
      // wait 4 seconds
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return toEventDTO(event);
    }),
});
