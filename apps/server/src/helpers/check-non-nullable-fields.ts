import { PlaventiEvent } from "../modules/event/event.model";

export function checkNonNullableFields<T, K extends keyof T>(
  object: T,
  fields: readonly K[],
  objectName: string,
): asserts object is T & { [P in K]-?: NonNullable<T[P]> } {
  for (const field of fields) {
    if (object[field] == null) {
      throw new Error(`${objectName} is missing required relationship: ${String(field)}`);
    }
  }
}
