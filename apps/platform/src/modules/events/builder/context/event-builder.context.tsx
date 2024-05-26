"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { invariant } from "~/utils/helpers";
import { useSetEventDetails } from "./dispatchers/set-event-details.dispatcher";
import { useNextStage } from "./dispatchers/next-stage.dispatcher";
import { eventBuilderReducer } from "./event-builder.reducer";
import {
  AdditionalInformation,
  DateAndTime,
  EventBuilderStage,
  EventDetails,
  LocationDetails,
  Tickets,
} from "./types/types";
import {
  AddTicketGroupAction,
  EventBuilderAction,
  RemoveTicketGroupAction,
  SetDateAndTimeAction,
  SetEventDetailsAction,
  SetIsLoadingAction,
  SetLocationDetailsAction,
  UpdateNumberOfTicketGroupsAction,
  setAdditionalInformationAction,
} from "./event-builder.actions";
import { useSetIsLoading } from "./dispatchers/set-is-loading.dispatcher";
import { useRouteListener } from "./listeners/route.listener";
import { useSetDateAndTime } from "./dispatchers/set-date-and-time.dispatcher";
import { useSetLocationDetails } from "./dispatchers/set-location-details.dispatcher";
import { useSetAdditionalInformation } from "./dispatchers/set-additional-information.dispatcher";
import { useAddTicketGroup } from "./dispatchers/add-ticket-group.dispatcher";
import { useRemoveTicketGroup } from "./dispatchers/remove-ticket-group.dispatcher";
import { useUpdateNumberOfTicketGroups } from "./dispatchers/update-number-of-ticket-groups.dispatcher";

export type EventBuilderState = {
  isLoading: boolean;
  stage: {
    current: EventBuilderStage;
    isCurrentStageComplete: boolean;
    previous: EventBuilderStage | null;
    next: EventBuilderStage | null;
  };
  eventDetails: EventDetails | null;
  dateAndTime: DateAndTime | null;
  locationDetails: LocationDetails | null;
  additionalInformation: AdditionalInformation | null;
  tickets: Tickets | null;
};

export type EventBuilderActionType = EventBuilderAction["type"];

type EventBuilderContextValue = {
  isLoading: EventBuilderState["isLoading"];
  stage: EventBuilderState["stage"];
  eventDetails: EventBuilderState["eventDetails"];
  dateAndTime: EventBuilderState["dateAndTime"];
  locationDetails: EventBuilderState["locationDetails"];
  additionalInformation: EventBuilderState["additionalInformation"];
  tickets: EventBuilderState["tickets"];
  nextStage: () => void;
  setEventDetails: (details: SetEventDetailsAction["payload"]) => void;
  setLocationDetails: (locationDetails: SetLocationDetailsAction["payload"]) => void;
  setDateAndTime: (dateAndTime: SetDateAndTimeAction["payload"]) => void;
  setAdditionalInformation: (additionalInformation: setAdditionalInformationAction["payload"]) => void;
  updateNumberOfTicketGroups: (args: UpdateNumberOfTicketGroupsAction["payload"]) => void;
  addTicketGroup: (args: AddTicketGroupAction["payload"]) => void;
  removeTicketGroup: (args: RemoveTicketGroupAction["payload"]) => void;
  setIsLoading: (args: SetIsLoadingAction["payload"]) => void;
};

export type EventBuilderActionHandler<A extends EventBuilderAction> = (
  state: EventBuilderState,
  action: A,
) => EventBuilderState;

export type EventBuilderDispatcher<A extends EventBuilderAction> = (
  dispatch: React.Dispatch<EventBuilderAction>,
) => (payload: A["payload"]) => void;

const calculateStage = () => {
  return {
    current: "tickets",
    isCurrentStageComplete: false,
    previous: null,
    next: "date",
  } as const;
};

const EventBuilderContext = createContext<EventBuilderContextValue | undefined>(undefined);

type EventBuilderContextProviderProps = {
  children: ReactNode;
};

export function EventBuilderContextProvider({ children }: EventBuilderContextProviderProps) {
  const initialValues: EventBuilderState = {
    isLoading: false,
    stage: calculateStage(),
    eventDetails: null,
    dateAndTime: null,
    locationDetails: null,
    additionalInformation: null,
    tickets: {
      status: "incomplete",
      paid: [
        {
          id: "1",
          name: "General Admission",
          description: "General Admission",
          price: 75,
          availableQuantity: 100,
          salesStart: new Date(),
          salesEnd: new Date(),
        },
      ],
      free: [],
    },
  };

  const [state, dispatch] = useReducer(eventBuilderReducer, initialValues);
  const nextStage = useNextStage(dispatch);
  const setEventDetails = useSetEventDetails(dispatch);
  const setDateAndTime = useSetDateAndTime(dispatch);
  const setLocationDetails = useSetLocationDetails(dispatch);
  const setAdditionalInformation = useSetAdditionalInformation(dispatch);
  const updateNumberOfTicketGroups = useUpdateNumberOfTicketGroups(dispatch);
  const addTicketGroup = useAddTicketGroup(dispatch);
  const removeTicketGroup = useRemoveTicketGroup(dispatch);
  const setIsLoading = useSetIsLoading(dispatch);
  // useRouteListener(state, dispatch);

  console.log("EventBuilderContextProvider", state);

  return (
    <EventBuilderContext.Provider
      value={{
        isLoading: state.isLoading,
        stage: state.stage,
        eventDetails: state.eventDetails,
        dateAndTime: state.dateAndTime,
        locationDetails: state.locationDetails,
        additionalInformation: state.additionalInformation,
        tickets: state.tickets,
        nextStage,
        setEventDetails,
        setLocationDetails,
        setDateAndTime,
        setAdditionalInformation,
        updateNumberOfTicketGroups,
        addTicketGroup,
        removeTicketGroup,
        setIsLoading,
      }}>
      {children}
    </EventBuilderContext.Provider>
  );
}

export function useEventBuilderContext() {
  const contextValue = useContext(EventBuilderContext);

  invariant(contextValue, "Missing EventBuilderContextProvider");

  return contextValue;
}
