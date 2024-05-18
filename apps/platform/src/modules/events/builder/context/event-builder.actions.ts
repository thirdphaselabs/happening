import { EventBuilderState } from "./event-builder.context";
import { EventBuilderStage } from "./types/types";

export type NextStageAction = {
  type: "NEXT_STAGE";
  payload: null;
};

export type SetEventDetailsAction = {
  type: "SET_EVENT_DETAILS";
  payload: NonNullable<Partial<EventBuilderState["eventDetails"]>>;
};

export type SetDateAndTimeAction = {
  type: "SET_DATE_AND_TIME";
  payload: NonNullable<Partial<EventBuilderState["dateAndTime"]>>;
};

export type UpdateCurrentStageCompletionAction = {
  type: "UPDATE_CURRENT_STAGE_COMPLETION";
  payload: null;
};

export type SetIsLoadingAction = {
  type: "SET_IS_LOADING";
  payload: boolean;
};

export type SetCurrentStageAction = {
  type: "SET_CURRENT_STAGE";
  payload: EventBuilderStage;
};

export type EventBuilderAction =
  | NextStageAction
  | SetEventDetailsAction
  | SetDateAndTimeAction
  | UpdateCurrentStageCompletionAction
  | SetIsLoadingAction
  | SetCurrentStageAction;
