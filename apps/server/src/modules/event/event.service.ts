import { EventPersistance } from "./event.persistance";
import { CreateEvent } from "./use-cases/create-event";

export class EventService {
  private eventPersistance: EventPersistance;
  private createEvent: CreateEvent;

  constructor(persistance?: EventPersistance) {
    if (!persistance) {
      this.eventPersistance = new EventPersistance();
    } else {
      this.eventPersistance = persistance;
    }

    this.createEvent = new CreateEvent(this.eventPersistance);
  }

  get() {
    return this.eventPersistance.get();
  }

  create(args: { title: string }) {
    return this.createEvent.execute(args);
  }
}
