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
      return state.dateAndTime?.status === "complete";
    case "location":
      return state.locationDetails?.status === "complete";
    case "additional-information":
      return state.additionalInformation?.status === "complete";
    case "tickets":
      return state.tickets?.status === "complete";
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
    case "location":
      return "date";
    case "additional-information":
      return "location";
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
      return "location";
    case "location":
      return "additional-information";
    case "additional-information":
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
  const isLocationComplete = state.locationDetails?.status === "complete";
  const isAdditionalInformationComplete = state.additionalInformation?.status === "complete";
  const isTicketsComplete = state.tickets?.status === "complete";
  switch (stage) {
    case "details":
      return true;
    case "date":
      return isEventDetailsComplete;
    case "location":
      return isEventDetailsComplete && isDateAndTimeComplete;
    case "tickets":
      return isEventDetailsComplete && isDateAndTimeComplete && isLocationComplete;
    case "additional-information":
      return isEventDetailsComplete && isDateAndTimeComplete && isLocationComplete && isTicketsComplete;
    case "confirmation":
      return (
        isEventDetailsComplete &&
        isDateAndTimeComplete &&
        isLocationComplete &&
        isTicketsComplete &&
        isAdditionalInformationComplete
      );
  }
}

export function computeStageCompletedUpTo(state: EventBuilderState): EventBuilderStage {
  const isEventDetailsComplete = state.eventDetails?.status === "complete";
  const isDateAndTimeComplete = state.dateAndTime?.status === "complete";
  const isLocationComplete = state.locationDetails?.status === "complete";
  const isAdditionalInformationComplete = state.additionalInformation?.status === "complete";
  const isTicketsComplete = state.tickets?.status === "complete";

  if (
    isEventDetailsComplete &&
    isDateAndTimeComplete &&
    isLocationComplete &&
    isAdditionalInformationComplete &&
    isTicketsComplete
  ) {
    return "confirmation";
  }

  if (
    isEventDetailsComplete &&
    isDateAndTimeComplete &&
    isLocationComplete &&
    isAdditionalInformationComplete
  ) {
    return "tickets";
  }

  if (isEventDetailsComplete && isDateAndTimeComplete && isLocationComplete) {
    return "additional-information";
  }

  if (isEventDetailsComplete && isDateAndTimeComplete) {
    return "location";
  }

  if (isEventDetailsComplete) {
    return "date";
  }

  return "details";
}
