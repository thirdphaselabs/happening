import { Dispatch, useCallback } from "react";
import {
  EventBuilderAction,
  SetLocationDetailsAction
} from "../event-builder.actions";

export function useSetLocationDetails(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: SetLocationDetailsAction["payload"]) => {
    dispatch({
      type: "SET_LOCATION_DETAILS",
      payload,
    });
    dispatch({
      type: "UPDATE_CURRENT_STAGE_COMPLETION",
      payload: null,
    });
  }, []);
}
