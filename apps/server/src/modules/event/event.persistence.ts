import { EventStatus, prisma } from "@plaventi/database";
import { AuthWithOrg } from "../../types/types";
import { CreateEventDTO } from "./dto/create-event.dto";
import { PlaventiEvent } from "./event.model";
import { GetEventDTO } from "./dto/get-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";

export class EventPersistence {
  all(auth: AuthWithOrg): Promise<Array<PlaventiEvent>> {
    return prisma.event.findMany({
      where: {
        userId: auth.userId,
        organisationId: auth.organizationId,
      },
    });
  }

  getByIdentifier(auth: AuthWithOrg, args: GetEventDTO): Promise<PlaventiEvent | null> {
    return prisma.event.findFirst({
      where: {
        identifier: args.identifier,
        userId: auth.userId,
        organisationId: auth.organizationId,
      },
    });
  }

  create(auth: AuthWithOrg, args: CreateEventDTO): Promise<PlaventiEvent> {
    return prisma.event.create({
      data: {
        identifier: args.identifier,
        status: EventStatus.DRAFT,
        title: args.title,
        description: args.description,
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

  update(auth: AuthWithOrg, args: UpdateEventDTO): Promise<PlaventiEvent> {
    return prisma.event.update({
      where: {
        identifier: args.identifier,
        organisationId: auth.organizationId,
        userId: auth.userId,
      },
      data: {
        title: args.title,
        description: args.description,
      },
    });
  }
}
