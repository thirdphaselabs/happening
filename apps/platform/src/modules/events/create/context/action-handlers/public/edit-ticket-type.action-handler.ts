import { EditTicketType } from "../../event-builder.actions";
import { EventBuilderActionHandler } from "../../event-builder.context";

export const editTicketTypeActionHandler: EventBuilderActionHandler<EditTicketType> = (
  state,
  action,
) => {
  return {
    ...state,
    tickets: {
      ...state.tickets,
      ticketTypes: state.tickets?.ticketTypes.map((ticketType) => {
        if (ticketType.id === action.payload.ticketType.id) {
          return action.payload.ticketType;
        }
        return ticketType;
      }) ?? [], 
    },
  };
};


  