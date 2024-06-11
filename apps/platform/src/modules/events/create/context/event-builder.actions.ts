import { EventBuilderState } from "./event-builder.context";
import { EventBuilderStage, FreeTicketGroup, PaidTicketGroup, TicketType } from "./types/types";

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
  payload: { locationDetails: NonNullable<Partial<EventBuilderState["locationDetails"]>> | undefined };
};

export type EditTicketType = {
  type: "EDIT_TICKET_TYPE";
  payload: {
    ticketType: TicketType;
  };
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
  | EditTicketType
  | RemoveTicketGroupAction
  | UpdateCurrentStageCompletionAction
  | SetIsLoadingAction
  | SetCurrentStageAction;
