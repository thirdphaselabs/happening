import { AddTicketGroupAction, SetLocationDetailsAction } from "../../event-builder.actions";
import { EventBuilderActionHandler, EventBuilderState } from "../../event-builder.context";
import { SectionStatus } from "../../types/types";

export const addTicketGroupActionHandler: EventBuilderActionHandler<AddTicketGroupAction> = (
  state,
  action,
) => {
  const tickets: Omit<NonNullable<EventBuilderState['tickets']>, 'status'> = {
    ...state.tickets,
    paid: [...(state.tickets?.paid ?? []), ...(action.payload.category === 'paid' ? [action.payload.group] : [])],
    free: [...(state.tickets?.free ?? []), ...(action.payload.category === 'free' ? [action.payload.group] : [])],
  };

  return {
    ...state,
    tickets: {
      ...tickets,
      status: computeStatus(tickets),
    },
  };
};

function computeStatus(state: Omit<NonNullable<EventBuilderState["tickets"]>, 'status'>): SectionStatus {
  const isComplete = (state?.paid?.length ?? 0) > 0 || (state?.free?.length ?? 0) > 0

  return isComplete ? "complete" : "incomplete";
}
  