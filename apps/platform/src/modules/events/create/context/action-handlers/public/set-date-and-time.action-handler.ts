import { SetDateAndTimeAction } from "../../event-builder.actions";
import { EventBuilderActionHandler } from "../../event-builder.context";


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
    },
  };
};
