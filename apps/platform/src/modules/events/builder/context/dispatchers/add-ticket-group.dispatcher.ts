import { Dispatch, useCallback } from "react";
import {
  AddTicketGroupAction,
  EventBuilderAction
} from "../event-builder.actions";

export function useAddTicketGroup(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: AddTicketGroupAction["payload"]) => {
    dispatch({
      type: "ADD_TICKET_GROUP",
      payload,
    });
    dispatch({
      type: "UPDATE_CURRENT_STAGE_COMPLETION",
      payload: null,
    });
  }, []);
}
