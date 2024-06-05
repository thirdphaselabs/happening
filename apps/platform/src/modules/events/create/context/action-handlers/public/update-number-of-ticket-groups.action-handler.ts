import { UpdateNumberOfTicketGroupsAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { computeTicketsStatus } from "../../utils/ticket";

export const updateNumberOfTicketGroupsActionHandler: EventBuilderActionHandler<UpdateNumberOfTicketGroupsAction> = (
  state,
  action,
) => {

  const tickets: Omit<NonNullable<EventBuilderState['tickets']>, 'status'> = {
    ...state.tickets,
    ...(action.payload.category === 'paid' ? { numberOfPaidTicketsEditing: action.payload.quantity } : {}),
    ...(action.payload.category === 'free' ? { numberOfFreeTicketsEditing: action.payload.quantity } : {}),
  };
  

  return {
    ...state,
    tickets: {
      ...tickets,
      status: computeTicketsStatus(tickets),
    },
  };
};
  