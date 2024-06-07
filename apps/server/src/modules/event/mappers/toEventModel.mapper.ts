import { checkNonNullableFields } from "../../../helpers/check-non-nullable-fields";
import { PersistedPlaventiEvent, PlaventiEvent, nonNullableEventFields } from "../event.model";

export function toEventModel(event: PersistedPlaventiEvent): PlaventiEvent {
  checkNonNullableFields(event, nonNullableEventFields, "Event");

  return event;
}
