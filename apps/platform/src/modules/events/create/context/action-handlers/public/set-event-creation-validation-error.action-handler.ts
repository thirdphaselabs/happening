import { SetEventCreationValidationErrorAction, SetLocationDetailsAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";

export const setEventCreationValidationErrorActionHandler: EventBuilderActionHandler<SetEventCreationValidationErrorAction> = (
  state,
  action,
) => {
  return {
    ...state,
   errors: {
      ...state.errors,
      ...action.payload,
   } 
  };
};
