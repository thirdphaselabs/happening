import { EventBuilderState } from "./event-builder.context";
import { EventBuilderStage, FreeTicketGroup, PaidTicketGroup } from "./types/types";

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

export type SetLocationDetailsAction = {
  type: "SET_LOCATION_DETAILS";
  payload: NonNullable<Partial<EventBuilderState["locationDetails"]>>;
};

export type UpdateNumberOfTicketGroupsAction = {
  type: "UPDATE_NUMBER_OF_TICKET_GROUPS";
  payload: { category: "paid" | "free"; quantity: number };
};

export type AddTicketGroupAction = {
  type: "ADD_TICKET_GROUP";
  payload: { category: "paid"; group: PaidTicketGroup } | { category: "free"; group: FreeTicketGroup };
};

export type RemoveTicketGroupAction = {
  type: "REMOVE_TICKET_GROUP";
  payload: { category: "paid" | "free"; id: string };
};

export type setAdditionalInformationAction = {
  type: "SET_ADDITIONAL_INFORMATION";
  payload: NonNullable<Partial<EventBuilderState["additionalInformation"]>>;
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
  | SetLocationDetailsAction
  | setAdditionalInformationAction
  | UpdateNumberOfTicketGroupsAction
  | AddTicketGroupAction
  | RemoveTicketGroupAction
  | UpdateCurrentStageCompletionAction
  | SetIsLoadingAction
  | SetCurrentStageAction;
