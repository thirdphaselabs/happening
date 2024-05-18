import { EventBuilderActionHandler, SetEventDetailsAction } from "../../event-builder.context";
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
  console.log({ name: payload.name, description: payload.description });
  const isComplete = payload.name !== undefined && payload.description !== undefined;

  return isComplete ? "complete" : "incomplete";
}
