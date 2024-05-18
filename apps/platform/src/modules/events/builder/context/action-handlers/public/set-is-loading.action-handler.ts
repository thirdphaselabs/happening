import { SetIsLoadingAction } from "../../event-builder.actions";
import { EventBuilderActionHandler } from "../../event-builder.context";

export const setIsLoadingActionHandler: EventBuilderActionHandler<SetIsLoadingAction> = (state, action) => {
  return {
    ...state,
    isLoading: action.payload,
  };
};