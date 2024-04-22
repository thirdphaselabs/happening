import { prisma } from "@plaventi/database";
import { AuthWithOrg } from "../../types/types";

export class EventPersistence {
  get(auth: AuthWithOrg) {
    return prisma.event.findMany({
      where: {
        userId: auth.userId,
        organisationId: auth.organizationId,
      },
    });
  }

  create(auth: AuthWithOrg, args: { title: string }) {
    return prisma.event.create({
      data: {
        title: args.title,
        user: {
          connect: {
            clerkId: auth.userId,
          },
        },
        organisation: {
          connect: {
            clerkOrganisationId: auth.organizationId,
          },
        },
      },
    });
  }
}
