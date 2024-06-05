import { Dispatch, useCallback } from "react";
import { EventBuilderAction, setAdditionalInformationAction } from "../event-builder.actions";

export function useSetAdditionalInformation(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: setAdditionalInformationAction["payload"]) => {
    dispatch({
      type: "SET_ADDITIONAL_INFORMATION",
      payload,
    });
    dispatch({
      type: "UPDATE_CURRENT_STAGE_COMPLETION",
      payload: null,
    });
  }, []);
}
