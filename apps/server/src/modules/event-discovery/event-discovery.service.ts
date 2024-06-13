import { PlaventiEvent } from "../event-management/event.model";
import { EventDiscoveryPersistence } from "./event-discovery.persistence";

export class EventDiscoveryService {
  private readonly eventDiscoveryPersistence: EventDiscoveryPersistence;

  constructor() {
    this.eventDiscoveryPersistence = new EventDiscoveryPersistence();
  }

  async getEventsForCity(city: string): Promise<Array<PlaventiEvent>> {
    return await this.eventDiscoveryPersistence.getEventsForCity(city);
  }

  async getEventByIdentifier(identifier: string): Promise<PlaventiEvent> {
    return await this.eventDiscoveryPersistence.getEventByIdentifier(identifier);
  }
}
