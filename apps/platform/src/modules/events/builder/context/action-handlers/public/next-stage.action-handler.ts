import { NextStageAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { EventBuilderStage } from "../../types/types";
import { computeNextStage, computeIsCurrentStageComplete, computePreviousStage } from "../../utils/stage";

export const nextStageActionHandler: EventBuilderActionHandler<NextStageAction> = (state, action) => {
  const newCurrentStage = computeNextStage(state.stage.current) ?? state.stage.current;
  console.log("Next stage", newCurrentStage);
  return {
    ...state,
    stage: {
      current: newCurrentStage,
      isCurrentStageComplete: computeIsCurrentStageComplete(state, newCurrentStage),
      next: computeNextStage(newCurrentStage),
      previous: computePreviousStage(newCurrentStage),
    },
  };
};

