import { prisma } from "@plaventi/database";
import { plaventiEventInclude } from "../event-management/event.model";
import { toEventModel } from "../event-management/mappers/toEventModel.mapper";

export class EventDiscoveryPersistence {
  async getEventsForCity(city: string) {
    const events = await prisma.event.findMany({
      where: {},
      include: plaventiEventInclude,
    });

    return events.map(toEventModel);
  }
}
