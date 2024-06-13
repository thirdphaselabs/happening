import { Dispatch, useCallback } from "react";
import { EventBuilderAction, SetEventDetailsAction } from "../event-builder.actions";

export function useSetEventDetails(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: SetEventDetailsAction["payload"]) => {
    dispatch({
      type: "SET_EVENT_DETAILS",
      payload,
    });
    dispatch({
      type: "UPDATE_CURRENT_STAGE_COMPLETION",
      payload: null,
    });
  }, []);
}
