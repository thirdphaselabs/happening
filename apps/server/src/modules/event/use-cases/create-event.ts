import { AuthWithOrg } from "../../../types/types";
import { EventPersistence } from "../event.persistence";

export type CreateEventArgs = {
  title: string;
};

export class CreateEvent {
  constructor(private readonly eventPersistence: EventPersistence) {}

  async execute(auth: AuthWithOrg, args: CreateEventArgs) {
    return this.eventPersistence.create(auth, args);
  }
}
