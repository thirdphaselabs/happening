import { setAdditionalInformationAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";

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
      requiresApproval: action.payload.requiresApproval ?? false,
      visibility: action.payload.visibility ?? "public",
    },
  };
};

