import { Dispatch, useCallback } from "react";
import { EditTicketTypeAction, EventBuilderAction } from "../event-builder.actions";

export function useEditTicketType(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: EditTicketTypeAction["payload"]) => {
    dispatch({
      type: "EDIT_TICKET_TYPE",
      payload,
    });
  }, []);
}
