import { z } from "zod";

export const updateEventDTO = z.object({
  identifier: z.string(),
  title: z.string(),
  description: z.string(),
});
export type UpdateEventDTO = z.infer<typeof updateEventDTO>;
