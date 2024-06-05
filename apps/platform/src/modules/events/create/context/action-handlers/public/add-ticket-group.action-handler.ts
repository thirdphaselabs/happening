import { SetTicketPrice, SetLocationDetailsAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { SectionStatus } from "../../types/types";

export const setTicketPriceActionHandler: EventBuilderActionHandler<SetTicketPrice> = (
  state,
  action,
) => {
  return {
    ...state,
    tickets: {
      ...state.tickets,
      type: action.payload.type,
      price: action.payload.price,
      status: "complete",
    },
  };
};


  