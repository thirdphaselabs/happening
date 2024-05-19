import { SetEventDetailsAction } from "../../event-builder.actions";
import { EventBuilderActionHandler } from "../../event-builder.context";
import { SectionStatus } from "../../types/types";

export const setEventDetailsActionHandler: EventBuilderActionHandler<SetEventDetailsAction> = (
  state,
  action,
) => {
  const updatedEventDetails = {
    ...state.eventDetails,
    ...action.payload,
  };

  return {
    ...state,
    eventDetails: {
      ...updatedEventDetails,
      status: computeStatus(updatedEventDetails),
    },
  };
};

function computeStatus(payload: SetEventDetailsAction["payload"]): SectionStatus {
  const isComplete = payload.name !== undefined && payload.description !== undefined;

  return isComplete ? "complete" : "incomplete";
}
