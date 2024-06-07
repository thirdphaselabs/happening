import { Prisma } from "@prisma/client";
import { NonNullableFields } from "../../helpers/non-nullable-fields";

export const plaventiEventInclude = Prisma.validator<Prisma.EventInclude>()({
  guestList: {
    include: {
      attendees: {
        include: {
          profile: true,
        },
      },
    },
  },
  timing: true,
  location: true,
  ticketing: true,
});

export const nonNullableEventFields = ["guestList", "timing", "location", "ticketing"] as const;

export type PersistedPlaventiEvent = Prisma.EventGetPayload<{
  include: typeof plaventiEventInclude;
}>;

export type PlaventiEvent = NonNullableFields<
  PersistedPlaventiEvent,
  (typeof nonNullableEventFields)[number]
>;
