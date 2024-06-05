import { EventStatus, LocationType, TicketType } from "@prisma/client";
import { start } from "repl";
import { z } from "zod";

export const eventDTO = z.object({
  identifier: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(EventStatus),
  coverImageUrl: z.string().nullable(),
  isApprovalRequired: z.boolean(),
  location: z.object({
    type: z.nativeEnum(LocationType),
    venue: z.string().nullable(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    country: z.string().nullable(),
    postalCode: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    onlineLocationLink: z.string().nullable(),
  }),
  timing: z.object({
    startDate: z.date(),
    endDate: z.date(),
    isStartTimeVisible: z.boolean(),
    isEndTimeVisible: z.boolean(),
    timezone: z.string(),
  }),
  ticketing: z.object({
    type: z.nativeEnum(TicketType),
    price: z.number().nullable(),
  }),
  guestList: z.object({
    requiresApproval: z.boolean(),
    isVisible: z.boolean(),
    attendees: z.array(
      z.object({
        userId: z.string(),
        isApproved: z.boolean(),
        user: z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string(),
          profilePictureUrl: z.string().nullable(),
        }),
      }),
    ),
  }),
});
export const eventDTOs = z.array(eventDTO);

export type EventDTO = z.infer<typeof eventDTO>;
