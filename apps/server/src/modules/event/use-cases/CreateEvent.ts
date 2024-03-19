import { EventPersistance } from "../event.persistance";

export class CreateEvent {
  constructor(private eventPersistance: EventPersistance) {}

  async execute(args: { title: string }) {
    return this.eventPersistance.create(args);
  }
}
