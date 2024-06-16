import { PlaventiSession } from "../auth/auth.controller";
import { ProfilePersistence } from "./profile.persistence";

export class ProfileService {
  private readonly profilePersistence = new ProfilePersistence();

  constructor() {
    this.profilePersistence = new ProfilePersistence();
  }

  async getAttending(session: PlaventiSession) {
    const attending = await this.profilePersistence.getAttending(session);

    return attending.map((event) => {
      return {
        eventId: event.id,
        identifier: event.identifier,
      };
    });
  }
}
