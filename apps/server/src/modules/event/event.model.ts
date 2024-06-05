import { Prisma } from "@prisma/client";

export type PlaventiEvent = Prisma.EventGetPayload<{
  include: {
    guestList: { include: { attendees: true } };
  };
}>;
