import { EventBuilderState } from "../event-builder.context";
import { SectionStatus } from "../types/types";

export function computeTicketsStatus(
  state: Omit<NonNullable<EventBuilderState["tickets"]>, "status">,
): SectionStatus {
  const isComplete = (state?.paid?.length ?? 0) > 0 || (state?.free?.length ?? 0) > 0;

  return isComplete ? "complete" : "incomplete";
}
