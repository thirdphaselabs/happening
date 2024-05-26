import { redirect, usePathname, useRouter } from "next/navigation";
import { Dispatch, useEffect } from "react";
import { EventBuilderAction } from "../event-builder.actions";
import { EventBuilderState } from "../event-builder.context";
import { EventBuilderStage } from "../types/types";
import { areAllPreviousStagesComplete, computeStageCompletedUpTo } from "../utils/stage";

export function useRouteListener(state: EventBuilderState, dispatch: Dispatch<EventBuilderAction>) {
  const router = useRouter();
  const pathName = usePathname();

  function handle(path: string) {
    console.log("Pathname changed", path);
    const stage = computeStageFromPathName(path);

    console.log("Stage", stage);

    if (!stage) {
      router.push("/events/create/details");
      dispatch({
        type: "SET_CURRENT_STAGE",
        payload: "details",
      });
      return;
    }

    if (state.stage.current === stage) {
      return;
    }

    const stageCompletedUpTo = computeStageCompletedUpTo(state);

    router.push(`/events/create/${stageCompletedUpTo}`);
    dispatch({
      type: "SET_CURRENT_STAGE",
      payload: stageCompletedUpTo,
    });
    // return redirect(`/event-builder/${stageCompletedUpTo}`);
  }

  useEffect(() => {
    handle(pathName);
  }, [pathName]);
}

function computeStageFromPathName(pathName: string): EventBuilderStage | null {
  console.log(pathName);
  switch (pathName) {
    case "/events/create/details":
      return "details";
    case "/events/create/date":
      return "date";
    case "/events/create/location":
      return "location";
    case "/events/create/additional-information":
      return "additional-information";
    case "/events/create/tickets":
      return "tickets";
    case "/events/create/confirmation":
      return "confirmation";
    default:
      return null;
  }
}
