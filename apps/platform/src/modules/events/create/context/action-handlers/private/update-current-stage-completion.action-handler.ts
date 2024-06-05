import { UpdateCurrentStageCompletionAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { computeIsCurrentStageComplete } from "../../utils/stage";

export const updateCurrentStageCompletionActionHandler: EventBuilderActionHandler<
  UpdateCurrentStageCompletionAction
> = (state, action) => {
  return {
    ...state,
    stage: {
      ...state.stage,
      isCurrentStageComplete: computeIsCurrentStageComplete(state, state.stage.current),
    },
  };
};
