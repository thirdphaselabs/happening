"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { NonNullableFields, invariant } from "~/utils/helpers";
import { useSetEventDetails } from "./dispatchers/set-event-details.dispatcher";
import { useNextStage } from "./dispatchers/next-stage.dispatcher";
import { eventBuilderReducer } from "./event-builder.reducer";
import {
  AdditionalInformation,
  CreateEventErrors,
  DateAndTime,
  EventDetails,
  LocationDetails,
  Tickets,
} from "./types/types";
import {
  CreateTicketTypeAction,
  EditTicketTypeAction,
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
import { useCreateTicketType } from "./dispatchers/create-ticket-type.dispatcher";
import { CreateEventInput } from "~/trpc/types";
import { useSetEventCreationValidationError } from "./dispatchers/set-event-creation-validation-error.dispatcher";
import { error } from "console";
import { useUploadImage } from "~/app/_hooks/useUploadImage";

export type EventBuilderState = {
  isLoading: boolean;
  eventDetails: EventDetails | null;
  dateAndTime: DateAndTime | null;
  locationDetails: LocationDetails | null;
  additionalInformation: AdditionalInformation | null;
  tickets: Tickets | null;
  errors: CreateEventErrors;
};

export type EventBuilderActionType = EventBuilderAction["type"];

type EventBuilderContextValue = {
  isLoading: EventBuilderState["isLoading"];
  eventDetails: EventBuilderState["eventDetails"];
  dateAndTime: EventBuilderState["dateAndTime"];
  locationDetails: EventBuilderState["locationDetails"];
  additionalInformation: EventBuilderState["additionalInformation"];
  tickets: EventBuilderState["tickets"];
  errors: EventBuilderState["errors"];
  nextStage: () => void;
  setEventDetails: (details: SetEventDetailsAction["payload"]) => void;
  setLocationDetails: (locationDetails: SetLocationDetailsAction["payload"]) => void;
  setDateAndTime: (dateAndTime: SetDateAndTimeAction["payload"]) => void;
  setAdditionalInformation: (additionalInformation: setAdditionalInformationAction["payload"]) => void;
  editTicketType: (args: EditTicketTypeAction["payload"]) => void;
  createTicketType: (args: CreateTicketTypeAction["payload"]) => void;
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
    errors: {
      "additional-information": null,
      "date-and-time": null,
      "event-details": null,
      location: null,
      ticketing: null,
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
  const createTicketType = useCreateTicketType(dispatch);
  const removeTicketGroup = useRemoveTicketGroup(dispatch);
  const setIsLoading = useSetIsLoading(dispatch);
  const setErrors = useSetEventCreationValidationError(dispatch);

  const upload = useUploadImage();
  // useRouteListener(state, dispatch);

  const createEvent = async () => {
    setIsLoading(true);

    // wait 4 seconds
    const event = {
      eventDetails: state.eventDetails,
      dateAndTime: state.dateAndTime,
      locationDetails: state.locationDetails,
      additionalInformation: state.additionalInformation,
      tickets: state.tickets,
    };

    let errors: CreateEventErrors = state.errors;

    if (!event.eventDetails?.description || !event.eventDetails?.name) {
      errors["event-details"] = "Event details are required";
      setIsLoading(false);
      return;
    }

    if (
      !event.locationDetails?.name ||
      !event.locationDetails?.formattedAddress ||
      !event.locationDetails?.placeId ||
      !event.locationDetails?.coordinates
    ) {
      errors["location"] = "Location details are required";
      setIsLoading(false);
      return;
    }

    if (!event.dateAndTime?.startDate || !event.dateAndTime?.endDate || !event.dateAndTime?.timezone) {
      errors["date-and-time"] = "Date and time details are required";
      setIsLoading(false);
      return;
    }

    if (!event.tickets || event.tickets?.ticketTypes.length === 0) {
      errors["ticketing"] = "At least one ticket type is required";
      setIsLoading(false);
      return;
    }

    if (!event.eventDetails.image) {
      errors["event-details"] = "Event image is required";
      setIsLoading(false);
      return;
    }

    const ticketTypes: CreateEventInput["ticketing"]["types"] = event.tickets.ticketTypes.map((ticket) => ({
      id: ticket.id,
      name: ticket.name!,
      description: ticket.description ?? null,
      price: ticket.price ?? null,
      availableQuantity: ticket.ticketCapacity ?? null,
      salesStart: ticket.salesStart ?? null,
      salesEnd: ticket.salesEnd ?? null,
    }));

    const imageUrl = await upload(event.eventDetails.image);

    if (!imageUrl) {
      errors["event-details"] = "Failed to upload image";
      setIsLoading(false);
      return;
    }

    const createEvent: CreateEventInput = {
      description: event.eventDetails.description,
      title: event.eventDetails.name,
      imageUrl,
      guestList: {
        requiresApproval: event.additionalInformation?.requiresApproval ?? false,
        isVisible: true,
        attendees: [],
      },
      isApprovalRequired: false,
      location: {
        name: event.locationDetails.name,
        formattedAddress: event.locationDetails.formattedAddress,
        placeId: event.locationDetails.placeId,
        coordinates: {
          lat: event.locationDetails.coordinates.lat,
          lng: event.locationDetails.coordinates.lng,
        },
      },
      ticketing: {
        types: ticketTypes,
      },
      timing: {
        startDate: event.dateAndTime.startDate,
        endDate: event.dateAndTime.endDate,
        isStartTimeVisible: event.dateAndTime.shouldDisplayStartDate ?? true,
        isEndTimeVisible: event.dateAndTime.shouldDisplayEndDate ?? true,
        timezone: event.dateAndTime.timezone,
      },
    };

    try {
      await mutateAsync(createEvent);
      router.push("/events");
    } catch (error) {
      console.error(error);
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
        errors: state.errors,
        nextStage,
        setEventDetails,
        setLocationDetails,
        setDateAndTime,
        setAdditionalInformation,
        editTicketType,
        createTicketType,
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
