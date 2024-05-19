import { SetLocationDetailsAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { SectionStatus } from "../../types/types";

export const setLocationDetailsActionHandler: EventBuilderActionHandler<SetLocationDetailsAction> = (
  state,
  action,
) => {
  const updatedEventDetails: Omit<EventBuilderState['locationDetails'], 'status'> = {
    ...state.locationDetails,
    ...action.payload,
  };

  return {
    ...state,
    locationDetails: {
      ...updatedEventDetails,
      status: computeStatus(updatedEventDetails),
    },
  };
};

function computeStatus(payload: SetLocationDetailsAction["payload"]): SectionStatus {
  const isComplete = payload.address !== undefined && payload.venue !== undefined;

  return isComplete ? "complete" : "incomplete";
}
