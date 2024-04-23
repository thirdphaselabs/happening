import { z } from "zod";

export const getEventDTO = z.object({
  identifier: z.string(),
});
export type GetEventDTO = z.infer<typeof getEventDTO>;
