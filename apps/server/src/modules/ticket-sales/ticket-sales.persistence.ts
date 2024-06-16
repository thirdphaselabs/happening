import { Prisma, prisma } from "@plaventi/database";
import { connect } from "http2";

export class TicketSalesPersistence {
  async getTicketTypeDetails(args: { eventId: string; ticketTypeId: string }) {
    const event = await prisma.event.findUnique({
      where: {
        id: args.eventId,
      },
      include: {
        ticketing: {
          include: {
            types: true,
          },
        },
        team: {
          include: {
            paymentAccount: true,
          },
        },
      },
    });

    if (!event || !event.ticketing) {
      throw new Error("Event not found");
    }

    if (!event.team.paymentAccount) {
      throw new Error("Team has no payment account");
    }

    const ticketType = event.ticketing.types.find((ticketType) => ticketType.id === args.ticketTypeId);

    if (!ticketType) {
      throw new Error("Ticket type not found");
    }

    return { ticketType, stripeAccountId: event.team.paymentAccount.stripeAccountId };
  }

  async createTicketPurchase({
    eventId,
    ticketTypeId,
    paymentIntentId,
    stripeCustomerId,
  }: {
    eventId: string;
    ticketTypeId: string;
    paymentIntentId: string;
    stripeCustomerId: string;
  }) {
    const [profile, event] = await Promise.all([
      prisma.profile.findUnique({
        where: {
          stripeCustomerId,
        },
      }),
      prisma.event.findUnique({
        where: {
          id: eventId,
        },
      }),
    ]);

    if (!profile) {
      throw new Error("Profile not found");
    }

    if (!event) {
      throw new Error("Event not found");
    }

    const isAlreadyOnGuestList = await prisma.guestListAttendee.findFirst({
      where: {
        profileId: profile.id,
        guestList: {
          eventId,
        },
      },
    });

    const transaction: (
      | Prisma.Prisma__TicketPurchaseClient<any, Prisma.TicketPurchaseCreateArgs>
      | Prisma.Prisma__GuestListAttendeeClient<any, Prisma.GuestListAttendeeCreateArgs>
    )[] = [
      prisma.ticketPurchase.create({
        data: {
          ticketTypeId,
          srtipePaymentIntentId: paymentIntentId,
          profileId: profile.id,
        },
      }),
    ];

    if (!isAlreadyOnGuestList) {
      transaction.push(
        prisma.guestListAttendee.create({
          data: {
            isApproved: true,
            guestList: {
              connect: {
                eventId,
              },
            },
            profile: {
              connect: {
                id: profile.id,
              },
            },
            ticketType: {
              connect: {
                id: ticketTypeId,
              },
            },
          },
        }),
      );
    }

    await prisma.$transaction(transaction);
  }
}
