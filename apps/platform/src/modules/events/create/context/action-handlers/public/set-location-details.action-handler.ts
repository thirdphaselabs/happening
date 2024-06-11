import { SetLocationDetailsAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";

export const setLocationDetailsActionHandler: EventBuilderActionHandler<SetLocationDetailsAction> = (
  state,
  action,
) => {

  return {
    ...state,
    locationDetails: action.payload.locationDetails ? {
        ...state.locationDetails,
        ...action.payload.locationDetails,
    } : null,
  };
};
