import { EventStatus } from "@prisma/client";
import { z } from "zod";

export const eventDTO = z.object({
  identifier: z.string(),
  title: z.string(),
  status: z.nativeEnum(EventStatus),
  description: z.string(),
  coverImageUrl: z.string().nullable(),
});
export const eventDTOs = z.array(eventDTO);

export type EventDTO = z.infer<typeof eventDTO>;
