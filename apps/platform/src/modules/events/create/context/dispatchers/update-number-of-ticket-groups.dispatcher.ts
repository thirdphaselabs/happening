import { Dispatch, useCallback } from "react";
import { EventBuilderAction, UpdateNumberOfTicketGroupsAction } from "../event-builder.actions";

export function useUpdateNumberOfTicketGroups(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: UpdateNumberOfTicketGroupsAction["payload"]) => {
    dispatch({
      type: "UPDATE_NUMBER_OF_TICKET_GROUPS",
      payload,
    });
    dispatch({
      type: "UPDATE_CURRENT_STAGE_COMPLETION",
      payload: null,
    });
  }, []);
}
