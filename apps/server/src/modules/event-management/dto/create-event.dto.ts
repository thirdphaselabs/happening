import { z } from "zod";
import { eventDTO } from "./event.dto";

export const createEventDTO = eventDTO.omit({ id: true, host: true, status: true });

export type CreateEventDTO = z.infer<typeof createEventDTO>;
