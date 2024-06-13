import { Dispatch, useCallback } from "react";
import { EventBuilderAction, RemoveTicketGroupAction } from "../event-builder.actions";

export function useRemoveTicketGroup(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: RemoveTicketGroupAction["payload"]) => {
    dispatch({
      type: "REMOVE_TICKET_GROUP",
      payload,
    });
    dispatch({
      type: "UPDATE_CURRENT_STAGE_COMPLETION",
      payload: null,
    });
  }, []);
}
