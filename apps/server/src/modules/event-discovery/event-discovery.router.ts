import { throwOnNotFound } from "../../helpers/throw-on-not-found";
import { createTRPCRouter } from "../../trpc/context";
import { publicProcedure } from "../../trpc/procedures/";
import { EventDiscoveryService } from "./event-discovery.service";
import { eventDTOs } from "../event-management/dto/event.dto";
import { toEventDTO } from "../event-management/mappers/toEventDTO.mapper";

const eventDiscoveryService = new EventDiscoveryService();

export const eventDiscoveryRouter = createTRPCRouter({
  allForCity: publicProcedure.output(eventDTOs).query(async ({ ctx }) => {
    const events = await eventDiscoveryService.getEventsForCity("test");

    return events.map(toEventDTO);
  }),
});
