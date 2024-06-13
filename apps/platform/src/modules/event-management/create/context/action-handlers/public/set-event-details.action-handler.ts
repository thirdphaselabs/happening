import { SetEventDetailsAction } from "../../event-builder.actions";
import { EventBuilderActionHandler } from "../../event-builder.context";

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
    },
  };
};

