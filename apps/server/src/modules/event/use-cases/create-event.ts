import { AuthWithOrg } from "../../../types/types";
import { CreateEventDTO } from "../dto/create-event.dto";
import { EventPersistence } from "../event.persistence";

export class CreateEvent {
  constructor(private readonly eventPersistence: EventPersistence) {}

  async execute(auth: AuthWithOrg, args: CreateEventDTO) {
    return this.eventPersistence.create(auth, args);
  }
}
