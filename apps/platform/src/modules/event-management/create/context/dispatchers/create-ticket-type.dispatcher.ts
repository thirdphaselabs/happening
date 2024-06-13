import { Dispatch, useCallback } from "react";
import { CreateTicketTypeAction, EditTicketTypeAction, EventBuilderAction } from "../event-builder.actions";

export function useCreateTicketType(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: CreateTicketTypeAction["payload"]) => {
    dispatch({
      type: "CREATE_TICKET_TYPE",
      payload,
    });
  }, []);
}
