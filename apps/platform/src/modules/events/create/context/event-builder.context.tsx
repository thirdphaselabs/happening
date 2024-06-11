"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { invariant } from "~/utils/helpers";
import { useSetEventDetails } from "./dispatchers/set-event-details.dispatcher";
import { useNextStage } from "./dispatchers/next-stage.dispatcher";
import { eventBuilderReducer } from "./event-builder.reducer";
import { AdditionalInformation, DateAndTime, EventDetails, LocationDetails, Tickets } from "./types/types";
import {
  EditTicketType,
  EventBuilderAction,
  RemoveTicketGroupAction,
  SetDateAndTimeAction,
  SetEventDetailsAction,
  SetIsLoadingAction,
  SetLocationDetailsAction,
  setAdditionalInformationAction,
} from "./event-builder.actions";
import { useSetIsLoading } from "./dispatchers/set-is-loading.dispatcher";
import { useSetDateAndTime } from "./dispatchers/set-date-and-time.dispatcher";
import { useSetLocationDetails } from "./dispatchers/set-location-details.dispatcher";
import { useSetAdditionalInformation } from "./dispatchers/set-additional-information.dispatcher";
import { useEditTicketType } from "./dispatchers/edit-ticket-type.dispatcher";
import { useRemoveTicketGroup } from "./dispatchers/remove-ticket-group.dispatcher";
import { api } from "~/trpc/provider";
import { useRouter } from "next/navigation";

export type EventBuilderState = {
  isLoading: boolean;
  eventDetails: EventDetails | null;
  dateAndTime: DateAndTime | null;
  locationDetails: LocationDetails | null;
  additionalInformation: AdditionalInformation | null;
  tickets: Tickets | null;
};

export type EventBuilderActionType = EventBuilderAction["type"];

type EventBuilderContextValue = {
  isLoading: EventBuilderState["isLoading"];
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
  editTicketType: (args: EditTicketType["payload"]) => void;
  removeTicketGroup: (args: RemoveTicketGroupAction["payload"]) => void;
  setIsLoading: (args: SetIsLoadingAction["payload"]) => void;
  createEvent: () => void;
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
    eventDetails: null,
    dateAndTime: {
      startDate: new Date(),
      endDate: new Date(),
    },
    locationDetails: null,
    additionalInformation: {
      visibility: "public",
      requiresApproval: false,
    },
    tickets: {
      ticketTypes: [
        {
          id: "1",
          name: "Standard",
          price: null,
          requiresApproval: false,
          ticketCapacity: null,
          lastUpdated: new Date(),
        },
      ],
    },
  };

  const { mutateAsync } = api.event.create.useMutation();
  const router = useRouter();

  const [state, dispatch] = useReducer(eventBuilderReducer, initialValues);
  const nextStage = useNextStage(dispatch);
  const setEventDetails = useSetEventDetails(dispatch);
  const setDateAndTime = useSetDateAndTime(dispatch);
  const setLocationDetails = useSetLocationDetails(dispatch);
  const setAdditionalInformation = useSetAdditionalInformation(dispatch);
  const editTicketType = useEditTicketType(dispatch);
  const removeTicketGroup = useRemoveTicketGroup(dispatch);
  const setIsLoading = useSetIsLoading(dispatch);
  // useRouteListener(state, dispatch);

  const createEvent = async () => {
    const event = {
      eventDetails: state.eventDetails,
      dateAndTime: state.dateAndTime,
      locationDetails: state.locationDetails,
      additionalInformation: state.additionalInformation,
      tickets: state.tickets,
    };

    setIsLoading(true);

    if (!event.eventDetails?.description || !event.eventDetails?.name) {
      setIsLoading(false);
      return;
    }

    try {
      await mutateAsync({
        description: event.eventDetails?.description,
        title: event.eventDetails?.name,
        coverImageUrl: event.eventDetails.coverImageUrl ?? null,
        guestList: {
          requiresApproval: event.additionalInformation?.requiresApproval ?? false,
          isVisible: true,
          attendees: [],
        },
        isApprovalRequired: false,
        location: {
          venue: event.locationDetails?.venue ?? null,
          address: event.locationDetails?.address ?? null,
          city: event.locationDetails?.city ?? null,
          country: event.locationDetails?.country ?? null,
          latitude: event.locationDetails?.latitude ?? null,
          longitude: event.locationDetails?.longitude ?? null,
          postalCode: event.locationDetails?.postalCode ?? null,
          onlineLocationLink: event.locationDetails?.onlineLocationLink ?? null,
          type: event.locationDetails?.onlineLocationLink ? "ONLINE" : "VENUE",
        },
        status: "DRAFT",
        ticketing: {
          type: "FREE",
          price: 0,
        },
        timing: {
          startDate: event.dateAndTime?.startDate ?? new Date(),
          endDate: event.dateAndTime?.endDate ?? new Date(),
          isEndTimeVisible: true,
          isStartTimeVisible: true,
          timezone: event.dateAndTime?.timezone ?? "UTC",
        },
      });
      router.push("/events");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Event Builder state", state);

  return (
    <EventBuilderContext.Provider
      value={{
        isLoading: state.isLoading,
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
        editTicketType,
        removeTicketGroup,
        setIsLoading,
        createEvent,
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
