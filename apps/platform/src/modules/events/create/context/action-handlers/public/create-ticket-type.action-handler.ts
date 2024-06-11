import { CreateTicketTypeAction, EditTicketTypeAction } from "../../event-builder.actions";
import { EventBuilderActionHandler } from "../../event-builder.context";

export const createTicketTypeActionHandler: EventBuilderActionHandler<CreateTicketTypeAction> = (
  state,
  action,
) => {
  return {
    ...state,
    tickets: {
      ...state.tickets,
      ticketTypes: [...(state.tickets?.ticketTypes ?? []), action.payload.ticketType],
    },
  };
};


  