import { EventStatus } from "@prisma/client";
import { z } from "zod";

export const eventDTO = z.object({
  id: z.string(),
  identifier: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(EventStatus),
  imageUrl: z.string(),
  isApprovalRequired: z.boolean(),
  location: z.object({
    name: z.string(),
    formattedAddress: z.string(),
    placeId: z.string(),
    coordinates: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  timing: z.object({
    startDate: z.date(),
    endDate: z.date(),
    isStartTimeVisible: z.boolean(),
    isEndTimeVisible: z.boolean(),
    timezone: z.string(),
  }),
  ticketing: z.object({
    types: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullable(),
        price: z.number().nullable(),
        availableQuantity: z.number().nullable(),
        salesStart: z.date().nullable(),
        salesEnd: z.date().nullable(),
      }),
    ),
  }),
  guestList: z.object({
    requiresApproval: z.boolean(),
    isVisible: z.boolean(),
    attendees: z.array(
      z.object({
        isApproved: z.boolean(),
        profile: z.object({
          firstName: z.string(),
          lastName: z.string(),
          profilePictureUrl: z.string().nullable(),
        }),
      }),
    ),
  }),
  host: z.object({
    id: z.string(),
    name: z.string(),
    profilePictureUrl: z.string().nullable(),
  }),
});
export const eventDTOs = z.array(eventDTO);

export type EventDTO = z.infer<typeof eventDTO>;
