import { PlaventiSession } from "../../controllers/auth.controller";
import { AuthWithOrg } from "../../types/types";
import { CreateEventDTO } from "./dto/create-event.dto";
import { EventDTO } from "./dto/event.dto";
import { GetEventDTO } from "./dto/get-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";
import { PlaventiEvent } from "./event.model";
import { EventPersistence } from "./event.persistence";
import { CreateEvent } from "./use-cases/create-event";

export class EventService {
  private eventPersistence: EventPersistence;
  private createEvent: CreateEvent;

  constructor() {
    this.eventPersistence = new EventPersistence();
    this.createEvent = new CreateEvent(this.eventPersistence);
  }

  get(auth: PlaventiSession): Promise<Array<PlaventiEvent>> {
    return this.eventPersistence.all(auth);
  }

  getByIdentifier(auth: AuthWithOrg, args: GetEventDTO): Promise<PlaventiEvent | null> {
    return this.eventPersistence.getByIdentifier(auth, args);
  }

  create(auth: AuthWithOrg, args: Omit<EventDTO, "identifier">): Promise<PlaventiEvent> {
    const identifier = args.title.toLowerCase().replace(/ /g, "-");
    return this.createEvent.execute(auth, {
      ...args,
      identifier,
    });
  }

  update(auth: AuthWithOrg, args: UpdateEventDTO) {
    return this.eventPersistence.update(auth, args);
  }
}
