import { AuthWithOrg } from "../../types/types";
import { EventPersistence } from "./event.persistence";
import { CreateEvent, CreateEventArgs } from "./use-cases/create-event";

export class EventService {
  private eventPersistence: EventPersistence;
  private createEvent: CreateEvent;

  constructor() {
    this.eventPersistence = new EventPersistence();
    this.createEvent = new CreateEvent(this.eventPersistence);
  }

  get(auth: AuthWithOrg) {
    return this.eventPersistence.get(auth);
  }

  create(auth: AuthWithOrg, args: CreateEventArgs) {
    return this.createEvent.execute(auth, args);
  }
}
