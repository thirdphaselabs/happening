import { UpdateCurrentStageCompletionAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";

export const updateCurrentStageCompletionActionHandler: EventBuilderActionHandler<
  UpdateCurrentStageCompletionAction
> = (state, action) => {
  return {
    ...state,
    stage: {
      ...state.stage,
      isCurrentStageComplete: computeIsCurrentStageComplete(state),
    },
  };
};

function computeIsCurrentStageComplete(state: EventBuilderState): boolean {
  switch (state.stage.current) {
    case "details":
      return state.eventDetails?.status === "complete";
    case "date":
      return state.dateAndTime?.status === "complete";
    case "tickets":
      return state.tickets?.status === "complete";
    case "confirmation":
      return false;
  }
}
