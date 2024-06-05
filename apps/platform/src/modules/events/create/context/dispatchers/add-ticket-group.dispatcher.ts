import { Dispatch, useCallback } from "react";
import { SetTicketPrice, EventBuilderAction } from "../event-builder.actions";

export function useAddTicketGroup(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: SetTicketPrice["payload"]) => {
    dispatch({
      type: "SET_TICKET_PRICE",
      payload,
    });
    dispatch({
      type: "UPDATE_CURRENT_STAGE_COMPLETION",
      payload: null,
    });
  }, []);
}
