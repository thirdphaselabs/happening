import { EventStatus, prisma } from "@plaventi/database";
import { SessionWithOrg } from "../../types/types";
import { EventDTO } from "./dto/event.dto";
import { GetEventDTO } from "./dto/get-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";
import { toEventModel } from "./mappers/toEventModel.mapper";
import { PlaventiEvent, plaventiEventInclude } from "./event.model";

export class EventPersistence {
  async all(auth: SessionWithOrg): Promise<Array<PlaventiEvent>> {
    const events = await prisma.event.findMany({
      where: {
        createdByProfileId: auth.profile.id,
        teamId: auth.team.id,
      },
      include: plaventiEventInclude,
    });

    return events.map(toEventModel);
  }

  async isIdentifierInUse(identifier: string): Promise<boolean> {
    const existing = await prisma.event.findUnique({
      where: {
        identifier,
      },
    });

    return !!existing;
  }

  async getByIdentifier(auth: SessionWithOrg, args: GetEventDTO): Promise<PlaventiEvent | null> {
    const event = await prisma.event.findFirst({
      where: {
        identifier: args.identifier,
        createdByProfileId: auth.profile.id,
        teamId: auth.team.id,
      },
      include: plaventiEventInclude,
    });

    if (!event) return null;

    return toEventModel(event);
  }

  async create(auth: SessionWithOrg, args: EventDTO): Promise<PlaventiEvent> {
    const createdEvent = await prisma.event.create({
      data: {
        identifier: args.identifier,
        title: args.title,
        description: args.description,
        status: EventStatus.DRAFT,
        coverImageUrl: args.coverImageUrl,
        isApprovalRequired: args.isApprovalRequired,
        location: {
          create: {
            type: args.location.type,
            venue: args.location.venue,
            address: args.location.address,
            city: args.location.city,
            country: args.location.country,
            postalCode: args.location.postalCode,
            latitude: args.location.latitude,
            longitude: args.location.longitude,
            onlineLocationLink: args.location.onlineLocationLink,
          },
        },
        timing: {
          create: {
            startDate: args.timing.startDate,
            endDate: args.timing.endDate,
            isStartTimeVisible: args.timing.isStartTimeVisible,
            isEndTimeVisible: args.timing.isEndTimeVisible,
            timezone: args.timing.timezone,
          },
        },
        ticketing: {
          create: {
            type: args.ticketing.type,
            price: args.ticketing.price,
          },
        },
        guestList: {
          create: {
            requiresApproval: args.guestList.requiresApproval,
            isVisible: args.guestList.isVisible,
          },
        },
        createdBy: {
          connect: {
            id: auth.profile.id,
          },
        },
        team: {
          connect: {
            id: auth.team.id,
          },
        },
      },
      include: plaventiEventInclude,
    });

    return toEventModel(createdEvent);
  }

  async update(auth: SessionWithOrg, args: UpdateEventDTO): Promise<PlaventiEvent> {
    const updatedEvent = await prisma.event.update({
      where: {
        identifier: args.identifier,
        teamId: auth.team.id,
        createdByProfileId: auth.profile.id,
      },
      data: {
        title: args.title,
        description: args.description,
      },
      include: plaventiEventInclude,
    });

    return toEventModel(updatedEvent);
  }
}
