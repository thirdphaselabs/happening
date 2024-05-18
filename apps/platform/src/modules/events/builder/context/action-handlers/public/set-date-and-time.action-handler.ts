import { SetDateAndTimeAction } from "../../event-builder.actions";
import { EventBuilderActionHandler } from "../../event-builder.context";
import { SectionStatus } from "../../types/types";

export const setDateAndTimeActionHandler: EventBuilderActionHandler<SetDateAndTimeAction> = (
  state,
  action,
) => {
  const updatedDateAndTime = {
    ...state.dateAndTime,
    ...action.payload,
  };

  return {
    ...state,
    dateAndTime: {
      ...updatedDateAndTime,
      status: computeStatus(updatedDateAndTime),
    },
  };
};

function computeStatus(payload: SetDateAndTimeAction["payload"]): SectionStatus {
  const isComplete = payload.startDate !== undefined && payload.endDate !== undefined;

  return isComplete ? "complete" : "incomplete";
}
