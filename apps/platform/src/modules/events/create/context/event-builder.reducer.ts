import { EventBuilderState } from "./event-builder.context";
import { setEventDetailsActionHandler } from "./action-handlers/public/set-event-details.action-handler";
import { EventBuilderAction } from "./event-builder.actions";
import { setIsLoadingActionHandler } from "./action-handlers/public/set-is-loading.action-handler";

import { setLocationDetailsActionHandler } from "./action-handlers/public/set-location-details.action-handler";
import { setAdditionalInformationActionHandler } from "./action-handlers/public/set-additional-information.action-handler";
import { editTicketTypeActionHandler } from "./action-handlers/public/edit-ticket-type.action-handler";
import { setDateAndTimeActionHandler } from "./action-handlers/public/set-date-and-time.action-handler";
import { createTicketTypeActionHandler } from "./action-handlers/public/create-ticket-type.action-handler";

export function eventBuilderReducer(state: EventBuilderState, action: EventBuilderAction): EventBuilderState {
  switch (action.type) {
    case "SET_EVENT_DETAILS":
      return setEventDetailsActionHandler(state, action);
    case "SET_IS_LOADING":
      return setIsLoadingActionHandler(state, action);
    case "SET_DATE_AND_TIME":
      return setDateAndTimeActionHandler(state, action);
    case "SET_LOCATION_DETAILS":
      return setLocationDetailsActionHandler(state, action);
    case "SET_ADDITIONAL_INFORMATION":
      return setAdditionalInformationActionHandler(state, action);
    case "EDIT_TICKET_TYPE":
      return editTicketTypeActionHandler(state, action);
    case "CREATE_TICKET_TYPE":
      return createTicketTypeActionHandler(state, action);
    default:
      return state;
  }
}
