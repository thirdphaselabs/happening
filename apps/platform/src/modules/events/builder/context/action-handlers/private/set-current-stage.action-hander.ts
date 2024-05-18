import { SetCurrentStageAction, UpdateCurrentStageCompletionAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { computeIsCurrentStageComplete, computeNextStage, computePreviousStage } from "../../utils/stage";

export const setCurrentStageActionHandler: EventBuilderActionHandler<SetCurrentStageAction> = (
  state,
  action,
) => {
  return {
    ...state,
    stage: {
      current: action.payload,
      isCurrentStageComplete: computeIsCurrentStageComplete(state, action.payload),
      next: computeNextStage(action.payload),
      previous: computePreviousStage(action.payload),
    },
  };
};
