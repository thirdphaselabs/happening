import { Dispatch, useCallback } from "react";
import { EventBuilderAction, SetDateAndTimeAction, SetEventDetailsAction } from "../event-builder.actions";

export function useSetDateAndTime(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: SetDateAndTimeAction["payload"]) => {
    dispatch({
      type: "SET_DATE_AND_TIME",
      payload,
    });
    dispatch({
      type: "UPDATE_CURRENT_STAGE_COMPLETION",
      payload: null,
    });
  }, []);
}
