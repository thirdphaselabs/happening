import { AuthWithOrg, SessionWithOrg } from "../../../types/types";
import { CreateEventDTO } from "../dto/create-event.dto";
import { EventDTO } from "../dto/event.dto";
import { EventPersistence } from "../event.persistence";

export class CreateEvent {
  constructor(private readonly eventPersistence: EventPersistence) {}

  async execute(auth: SessionWithOrg, args: EventDTO) {
    return this.eventPersistence.create(auth, args);
  }
}
