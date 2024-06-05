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
  SetTicketPrice,
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
import { api } from "~/trpc/provider";
import { useRouter } from "next/navigation";

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
  setTicketPrice: (args: SetTicketPrice["payload"]) => void;
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
    stage: calculateStage(),
    eventDetails: null,
    dateAndTime: null,
    locationDetails: null,
    additionalInformation: null,
    tickets: {
      status: "incomplete",
      type: "free",
      price: null,
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
  const updateNumberOfTicketGroups = useUpdateNumberOfTicketGroups(dispatch);
  const setTicketPrice = useAddTicketGroup(dispatch);
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
          price: event.tickets?.price ?? null,
          type: event.tickets?.type === "free" ? "FREE" : "PAID",
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
        setTicketPrice,
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
