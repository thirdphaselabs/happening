"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { api } from "~/trpc/provider";
import { PlaventiEvent } from "~/trpc/types";
import { invariant } from "~/utils/helpers";

type EventDetailsState = {
  event: PlaventiEvent;
};

const EventsDetailsContext = createContext<EventDetailsState | undefined>(undefined);

type EventDetailsContextProviderProps = {
  children: ReactNode;
  event: PlaventiEvent;
};

export function EventDetailsContextProvider({
  children,
  event: initialEvent,
}: EventDetailsContextProviderProps) {
  const { data: event } = api.event.byIdentifier.useQuery(
    { identifier: initialEvent.identifier },
    {
      initialData: initialEvent,
    },
  );

  const value = useMemo(() => ({ event }), [event]);

  return <EventsDetailsContext.Provider value={value}>{children}</EventsDetailsContext.Provider>;
}

export function useEventDetails() {
  const contextValue = useContext(EventsDetailsContext);

  invariant(contextValue, "Missing EventDetailsProvider");

  return contextValue;
}
