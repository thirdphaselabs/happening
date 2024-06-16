export function assertError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new Error(`Received unknown error type: ${typeof error}.`);
  }
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}
