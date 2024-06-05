import { RemoveTicketGroupAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { computeTicketsStatus } from "../../utils/ticket";

export const removeTicketGroupActionHandler: EventBuilderActionHandler<RemoveTicketGroupAction> = (
  state,
  action,
) => {
  const tickets: Omit<NonNullable<EventBuilderState['tickets']>, 'status'> = {
    ...(action.payload.category === 'paid' ? { paid: (state.tickets?.paid ?? []).filter((group) => group.id !== action.payload.id), numberOfPaidTicketsEditing: Math.max(0, state.tickets?.numberOfPaidTicketsEditing ?? 0 - 1) - 1 } : {}),
    ...(action.payload.category === 'free' ? { free: (state.tickets?.free ?? []).filter((group) => group.id !== action.payload.id), numberOfFreeTicketsEditing: Math.max(0, state.tickets?.numberOfFreeTicketsEditing ?? 0 - 1) - 1 } : {}),
  };

  return {
    ...state,
    tickets: {
      ...tickets,
      status: computeTicketsStatus(tickets),
    },
  };
};

