import { EventBuilderState } from "../event-builder.context";
import { EventBuilderStage } from "../types/types";

export function computeIsCurrentStageComplete(
  state: EventBuilderState,
  currentStage: EventBuilderStage,
): boolean {
  switch (currentStage) {
    case "details":
      return state.eventDetails?.status === "complete";
    case "date":
      return false;
    case "tickets":
      return false;
    case "confirmation":
      return false;
  }
}

export function computePreviousStage(currentStage: EventBuilderStage): EventBuilderStage | null {
  switch (currentStage) {
    case "details":
      return null;
    case "date":
      return "details";
    case "tickets":
      return "date";
    case "confirmation":
      return "tickets";
  }
}

export function computeNextStage(currentStage: EventBuilderStage): EventBuilderStage | null {
  switch (currentStage) {
    case "details":
      return "date";
    case "date":
      return "tickets";
    case "tickets":
      return "confirmation";
    case "confirmation":
      return null;
  }
}

export function areAllPreviousStagesComplete(state: EventBuilderState, stage: EventBuilderStage): boolean {
  const isEventDetailsComplete = state.eventDetails?.status === "complete";
  const isDateAndTimeComplete = state.dateAndTime?.status === "complete";
  const isTicketsComplete = state.tickets?.status === "complete";
  switch (stage) {
    case "details":
      return true;
    case "date":
      return isEventDetailsComplete;
    case "tickets":
      return isEventDetailsComplete && isDateAndTimeComplete;
    case "confirmation":
      return isEventDetailsComplete && isDateAndTimeComplete && isTicketsComplete;
  }
}

export function computeStageCompletedUpTo(state: EventBuilderState): EventBuilderStage {
  const isEventDetailsComplete = state.eventDetails?.status === "complete";
  const isDateAndTimeComplete = state.dateAndTime?.status === "complete";
  const isTicketsComplete = state.tickets?.status === "complete";

  if (isEventDetailsComplete && isDateAndTimeComplete && isTicketsComplete) {
    return "confirmation";
  }

  if (isEventDetailsComplete && isDateAndTimeComplete) {
    return "tickets";
  }

  if (isEventDetailsComplete) {
    return "date";
  }

  return "details";
}
