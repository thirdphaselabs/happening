import { prisma } from "@plaventi/database";
import { Media } from "@prisma/client";
import { SessionWithOrg } from "../../types/types";

export class ImagePersistence {
  async addMediaToTeamMediaLibrary(session: SessionWithOrg, url: string): Promise<Media> {
    const response = await prisma.media.create({
      data: {
        url,
        team: {
          connect: {
            id: session.team.id,
          },
        },
      },
    });

    return response;
  }
}
