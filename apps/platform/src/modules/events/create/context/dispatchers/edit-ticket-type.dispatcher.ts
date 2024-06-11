import { Dispatch, useCallback } from "react";
import { EditTicketType, EventBuilderAction } from "../event-builder.actions";

export function useEditTicketType(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: EditTicketType["payload"]) => {
    dispatch({
      type: "EDIT_TICKET_TYPE",
      payload,
    });
  }, []);
}
