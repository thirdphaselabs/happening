import { Dispatch, useCallback } from "react";
import { EventBuilderAction } from "../event-builder.actions";
import { useRouter } from "next/navigation";

export function useNextStage(dispatch: Dispatch<EventBuilderAction>) {
  const router = useRouter();
  return useCallback(() => {
    dispatch({
      type: "NEXT_STAGE",
      payload: null,
    });
  }, []);
}
