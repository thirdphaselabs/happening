import { prisma } from "@plaventi/database";
import { PlaventiSession } from "../auth/auth.controller";

export class ProfilePersistence {
  async getAttending(session: PlaventiSession) {
    return prisma.event.findMany({
      where: {
        guestList: {
          attendees: { some: { profileId: session.profile.id } },
        },
      },
    });
  }
}
