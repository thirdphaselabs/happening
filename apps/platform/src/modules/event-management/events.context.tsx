"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { api } from "~/trpc/provider";
import { invariant } from "~/utils/helpers";
import { PlaventiEvent } from "../../trpc/types";

type MyEventsState = {
  events: PlaventiEvent[];
};

const MyEventsContext = createContext<MyEventsState | undefined>(undefined);

type MyEventsContextProviderProps = {
  children: ReactNode;
  events: Array<PlaventiEvent>;
};

export function MyEventsProvider({ children, events: initialEvents }: MyEventsContextProviderProps) {
  const { data: events } = api.event.all.useQuery(undefined, {
    initialData: initialEvents,
  });

  const value = useMemo(() => ({ events }), [events]);

  return <MyEventsContext.Provider value={value}>{children}</MyEventsContext.Provider>;
}

export function useMyEvents() {
  const contextValue = useContext(MyEventsContext);

  invariant(contextValue, "Missing UserContextProvider");

  return contextValue;
}
