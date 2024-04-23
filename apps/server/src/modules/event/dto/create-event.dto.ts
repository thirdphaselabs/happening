import { z } from "zod";

export const createEventDTO = z.object({
  identifier: z.string(),
  title: z.string(),
  description: z.string(),
});

export type CreateEventDTO = z.infer<typeof createEventDTO>;
