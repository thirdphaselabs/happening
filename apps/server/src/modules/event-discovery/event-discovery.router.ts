import { z } from "zod";
import { createTRPCRouter } from "../../trpc/context";
import { publicProcedure } from "../../trpc/procedures/";
import { eventDTO, eventDTOs } from "../event-management/dto/event.dto";
import { toEventDTO } from "../event-management/mappers/toEventDTO.mapper";
import { EventDiscoveryService } from "./event-discovery.service";

const eventDiscoveryService = new EventDiscoveryService();

export const eventDiscoveryRouter = createTRPCRouter({
  byIdentifier: publicProcedure
    .input(
      z.object({
        identifier: z.string(),
      }),
    )
    .output(eventDTO)
    .query(async ({ input }) => {
      try {
        const event = await eventDiscoveryService.getEventByIdentifier(input.identifier);

        return toEventDTO(event);
      } catch (error) {
        console.error("event by identifer", error);
        throw new Error("Event not asass  found");
      }
    }),
  allForCity: publicProcedure.output(eventDTOs).query(async ({ ctx }) => {
    const events = await eventDiscoveryService.getEventsForCity("test");

    return events.map(toEventDTO);
  }),
});
