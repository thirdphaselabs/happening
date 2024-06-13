import { prisma } from "@plaventi/database";
import { PlaventiEvent, plaventiEventInclude } from "../event-management/event.model";
import { toEventModel } from "../event-management/mappers/toEventModel.mapper";

export class EventDiscoveryPersistence {
  async getEventByIdentifier(identifier: string): Promise<PlaventiEvent> {
    console.log("getEventByIdentifier", identifier);
    const event = await prisma.event.findUnique({
      where: {
        identifier: identifier,
      },
      include: plaventiEventInclude,
    });

    console.log("event", event);
    if (!event) {
      throw new Error(`Event with id ${identifier} not found`);
    }

    return toEventModel(event);
  }

  async getEventsForCity(city: string) {
    const events = await prisma.event.findMany({
      where: {},
      include: plaventiEventInclude,
    });

    return events.map(toEventModel);
  }
}
