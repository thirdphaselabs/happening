import { z } from "zod";

export const PlaventiEvent = z.object({
  id: z.string(),
  title: z.string(),
});

export type PlaventiEvent = z.infer<typeof PlaventiEvent>;
