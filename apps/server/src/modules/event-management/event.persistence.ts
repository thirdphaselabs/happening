import { EventStatus, prisma } from "@plaventi/database";
import { SessionWithOrg } from "../../types/types";
import { EventDTO } from "./dto/event.dto";
import { GetEventDTO } from "./dto/get-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";
import { toEventModel } from "./mappers/toEventModel.mapper";
import { PlaventiEvent, plaventiEventInclude } from "./event.model";
import { CreateEventDTO } from "./dto/create-event.dto";

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

  async create(auth: SessionWithOrg, args: CreateEventDTO): Promise<PlaventiEvent> {
    const createdEvent = await prisma.event.create({
      data: {
        identifier: args.identifier,
        title: args.title,
        description: args.description,
        status: EventStatus.DRAFT,
        imageUrl: args.imageUrl,
        isApprovalRequired: args.isApprovalRequired,
        location: {
          create: {
            formattedAddress: args.location.formattedAddress,
            googlePlaceId: args.location.placeId,
            latitude: args.location.coordinates.lat,
            longitude: args.location.coordinates.lng,
            name: args.location.name,
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
            types: {
              create: args.ticketing.types.map((ticket) => ({
                name: ticket.name,
                description: ticket.description,
                price: ticket.price,
                availableQuantity: ticket.availableQuantity,
                salesStart: ticket.salesStart,
                salesEnd: ticket.salesEnd,
              })),
            },
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
