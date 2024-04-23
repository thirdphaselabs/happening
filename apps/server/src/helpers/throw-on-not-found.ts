import { TRPCError } from "@trpc/server";

export function throwOnNotFound<T>(event: T | null, message = "Not found"): asserts event is T {
  if (!event) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message,
    });
  }
}
