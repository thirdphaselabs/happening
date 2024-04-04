import { TRPCError } from "@trpc/server";

export function assertError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new Error(`Received unknown error type: ${typeof error}.`);
  }
}

export function getTRPCError(error: unknown): TRPCError | null {
  const errorObj = error as { name?: string; data: unknown };
  if (errorObj?.name === "TRPCClientError") {
    return JSON.parse(JSON.stringify(errorObj.data as TRPCError)) as TRPCError;
  }
  return null;
}
