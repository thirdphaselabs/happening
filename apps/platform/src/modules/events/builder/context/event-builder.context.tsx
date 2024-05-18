"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { invariant } from "~/utils/helpers";
import { useSetEventDetails } from "./dispatchers/set-event-details.dispatcher";
import { useNextStage } from "./dispatchers/next-stage.dispatcher";
import { eventBuilderReducer } from "./event-builder.reducer";
import { DateAndTime, EventBuilderStage, EventDetails, Tickets } from "./types/types";
import {
  EventBuilderAction,
  SetDateAndTimeAction,
  SetEventDetailsAction,
  SetIsLoadingAction,
} from "./event-builder.actions";
import { useSetIsLoading } from "./dispatchers/set-is-loading.dispatcher";
import { useRouteListener } from "./listeners/route.listener";
import { useSetDateAndTime } from "./dispatchers/set-date-and-time.dispatcher";

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
  tickets: Tickets | null;
};

export type EventBuilderActionType = EventBuilderAction["type"];

type EventBuilderContextValue = {
  isLoading: EventBuilderState["isLoading"];
  stage: EventBuilderState["stage"];
  eventDetails: EventBuilderState["eventDetails"];
  dateAndTime: EventBuilderState["dateAndTime"];
  nextStage: () => void;
  setEventDetails: (details: SetEventDetailsAction["payload"]) => void;
  setDateAndTime: (dateAndTime: SetDateAndTimeAction["payload"]) => void;
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
    current: "details",
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
    tickets: null,
  };

  const [state, dispatch] = useReducer(eventBuilderReducer, initialValues);
  const nextStage = useNextStage(dispatch);
  const setEventDetails = useSetEventDetails(dispatch);
  const setDateAndTime = useSetDateAndTime(dispatch);
  const setIsLoading = useSetIsLoading(dispatch);
  useRouteListener(state, dispatch);

  console.log("EventBuilderContextProvider", state);

  return (
    <EventBuilderContext.Provider
      value={{
        isLoading: state.isLoading,
        stage: state.stage,
        eventDetails: state.eventDetails,
        dateAndTime: state.dateAndTime,
        nextStage,
        setEventDetails,
        setDateAndTime,
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
