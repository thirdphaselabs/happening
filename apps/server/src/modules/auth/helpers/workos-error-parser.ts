import { z } from "zod";

const workosErrorSchema = z.object({
  rawData: z.object({
    code: z.string(),
    message: z.string(),
  }),
  status: z.number(),
});

export function parseWorkOSError(error: unknown) {
  try {
    if (!(error instanceof Error)) {
      throw new Error(`Received unknown error type: ${typeof error}.`);
    }

    const parsed = workosErrorSchema.parse(error);

    return {
      code: parsed.rawData.code,
      message: parsed.rawData.message,
      status: parsed.status,
    };
  } catch {
    return {
      code: "unknown_error",
      message: "An unknown error occurred",
      status: 500,
    };
  }
}
