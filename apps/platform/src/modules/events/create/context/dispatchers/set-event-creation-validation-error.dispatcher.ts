import { Dispatch, useCallback } from "react";
import { EventBuilderAction, SetEventCreationValidationErrorAction } from "../event-builder.actions";
import { useRouter } from "next/navigation";

export function useSetEventCreationValidationError(dispatch: Dispatch<EventBuilderAction>) {
  const router = useRouter();
  return useCallback((payload: SetEventCreationValidationErrorAction["payload"]) => {
    dispatch({
      type: "SET_ERROR",
      payload,
    });
  }, []);
}
