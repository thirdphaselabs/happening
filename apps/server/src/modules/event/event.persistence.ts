import { EventStatus, prisma } from "@plaventi/database";
import { SessionWithOrg } from "../../types/types";
import { EventDTO } from "./dto/event.dto";
import { GetEventDTO } from "./dto/get-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";
import { PlaventiEvent } from "./event.model";

export class EventPersistence {
  all(auth: SessionWithOrg): Promise<Array<PlaventiEvent>> {
    return prisma.event.findMany({
      where: {
        createdByProfileId: auth.profile.id,
        teamId: auth.organisationId,
      },
      include: {
        guestList: {
          include: {
            attendees: true,
          },
        },
      },
    });
  }

  getByIdentifier(auth: SessionWithOrg, args: GetEventDTO): Promise<PlaventiEvent | null> {
    return prisma.event.findFirst({
      where: {
        identifier: args.identifier,
        createdByProfileId: auth.profile.id,
        teamId: auth.organisationId,
      },
      include: {
        guestList: {
          include: {
            attendees: true,
          },
        },
      },
    });
  }

  create(auth: SessionWithOrg, args: EventDTO): Promise<PlaventiEvent> {
    return prisma.event.create({
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
            id: auth.organisationId,
          },
        },
      },
      include: {
        guestList: {
          include: {
            attendees: true,
          },
        },
      },
    });
  }

  update(auth: SessionWithOrg, args: UpdateEventDTO): Promise<PlaventiEvent> {
    return prisma.event.update({
      where: {
        identifier: args.identifier,
        teamId: auth.organisationId,
        createdByProfileId: auth.profile.id,
      },
      data: {
        title: args.title,
        description: args.description,
      },
      include: {
        guestList: {
          include: {
            attendees: true,
          },
        },
      },
    });
  }
}
