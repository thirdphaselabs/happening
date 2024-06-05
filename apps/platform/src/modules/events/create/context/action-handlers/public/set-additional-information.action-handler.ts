import { SetEventDetailsAction, setAdditionalInformationAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { SectionStatus } from "../../types/types";

export const setAdditionalInformationActionHandler: EventBuilderActionHandler<setAdditionalInformationAction> = (
  state,
  action,
) => {
  const updatedAdditionalInformation: Omit<EventBuilderState["additionalInformation"], "status"> = {
    ...state.additionalInformation,
    ...action.payload,
  };

  return {
    ...state,
    additionalInformation: {
      ...updatedAdditionalInformation,
      status: computeStatus(updatedAdditionalInformation),
      requiresApproval: action.payload.requiresApproval ?? false,
    },
  };
};

function computeStatus(payload: setAdditionalInformationAction["payload"]): SectionStatus {
  const isComplete = payload.description !== undefined && (payload.tags?.length ?? 0) > 0;

  return isComplete ? "complete" : "incomplete";
}
