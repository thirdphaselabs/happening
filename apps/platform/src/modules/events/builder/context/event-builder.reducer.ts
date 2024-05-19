import { EventBuilderState } from "./event-builder.context";
import { setEventDetailsActionHandler } from "./action-handlers/public/set-event-details.action-handler";
import { nextStageActionHandler } from "./action-handlers/public/next-stage.action-handler";
import { updateCurrentStageCompletionActionHandler } from "./action-handlers/private/update-current-stage-completion.action-handler";
import { EventBuilderAction } from "./event-builder.actions";
import { setIsLoadingActionHandler } from "./action-handlers/public/set-is-loading.action-handler";
import { setCurrentStageActionHandler } from "./action-handlers/private/set-current-stage.action-hander";
import { setDateAndTimeActionHandler } from "../components/set-date-and-time.action-handler";
import { setLocationDetailsActionHandler } from "./action-handlers/public/set-location-details.action-handler";
import { setAdditionalInformationActionHandler } from "./action-handlers/public/set-additional-information.action-handler";
import { addTicketGroupActionHandler } from "./action-handlers/public/add-ticket-group.action-handler";
import { removeTicketGroupActionHandler } from "./action-handlers/public/remove-ticket-group.action-handler";
import { updateNumberOfTicketGroupsActionHandler } from "./action-handlers/public/update-number-of-ticket-groups.action-handler";

export function eventBuilderReducer(state: EventBuilderState, action: EventBuilderAction): EventBuilderState {
  switch (action.type) {
    case "NEXT_STAGE":
      return nextStageActionHandler(state, action);
    case "SET_EVENT_DETAILS":
      return setEventDetailsActionHandler(state, action);
    case "UPDATE_CURRENT_STAGE_COMPLETION":
      return updateCurrentStageCompletionActionHandler(state, action);
    case "SET_IS_LOADING":
      return setIsLoadingActionHandler(state, action);
    case "SET_CURRENT_STAGE":
      return setCurrentStageActionHandler(state, action);
    case "SET_DATE_AND_TIME":
      return setDateAndTimeActionHandler(state, action);
    case "SET_LOCATION_DETAILS":
      return setLocationDetailsActionHandler(state, action);
    case "SET_ADDITIONAL_INFORMATION":
      return setAdditionalInformationActionHandler(state, action);
    case "ADD_TICKET_GROUP":
      return addTicketGroupActionHandler(state, action);
    case "REMOVE_TICKET_GROUP":
      return removeTicketGroupActionHandler(state, action);
    case 'UPDATE_NUMBER_OF_TICKET_GROUPS':
      return updateNumberOfTicketGroupsActionHandler(state, action);
    default:
      return state;
  }
}
