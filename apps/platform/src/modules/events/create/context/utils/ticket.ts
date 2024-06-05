import { EventBuilderState } from "../event-builder.context";
import { SectionStatus } from "../types/types";

export function computeTicketsStatus(
  state: Omit<NonNullable<EventBuilderState["tickets"]>, "status">,
): SectionStatus {
  const isComplete = state.type === "free" ? true : state.price !== null;

  return isComplete ? "complete" : "incomplete";
}
