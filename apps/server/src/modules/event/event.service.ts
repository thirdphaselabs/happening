import { SessionWithOrg } from "../../types/types";
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

  get(auth: SessionWithOrg): Promise<Array<PlaventiEvent>> {
    return this.eventPersistence.all(auth);
  }

  getByIdentifier(auth: SessionWithOrg, args: GetEventDTO): Promise<PlaventiEvent | null> {
    return this.eventPersistence.getByIdentifier(auth, args);
  }

  async create(auth: SessionWithOrg, args: Omit<EventDTO, "identifier">): Promise<PlaventiEvent> {
    const identifier = await this.createUniqueIdentifier(args.title, 0);

    return this.createEvent.execute(auth, {
      ...args,
      identifier,
    });
  }

  update(auth: SessionWithOrg, args: UpdateEventDTO) {
    return this.eventPersistence.update(auth, args);
  }

  private async createUniqueIdentifier(eventTitle: string, attempt = 0): Promise<string> {
    if (attempt === 5) {
      throw new Error("Max attempts reached creating unique identifier");
    }
    const identifier = `${eventTitle.toLowerCase().replace(/ /g, "-")}${attempt !== 0 ? attempt : ""}`;
    const removedSpecialChars = identifier.replace(/[^a-zA-Z0-9-]/g, "");
    const isIdentifierInUse = await this.eventPersistence.isIdentifierInUse(removedSpecialChars);
    if (isIdentifierInUse) {
      return this.createUniqueIdentifier(removedSpecialChars, attempt + 1);
    }

    return removedSpecialChars;
  }
}
