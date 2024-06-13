import { Dispatch, useCallback } from "react";
import { EventBuilderAction, SetIsLoadingAction, NextStageAction } from "../event-builder.actions";

export function useSetIsLoading(dispatch: Dispatch<EventBuilderAction>) {
  return useCallback((payload: SetIsLoadingAction["payload"]) => {
    dispatch({
      type: "SET_IS_LOADING",
      payload,
    });
  }, []);
}
