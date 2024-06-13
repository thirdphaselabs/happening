"use client";

import { EventBuilderContextProvider } from "~/modules/event-management/create/context/event-builder.context";
import { CreateEvent } from "~/modules/event-management/create/views/create-event.view";

export default function EventBuilderPageRoot() {
  return (
    <EventBuilderContextProvider>
      <CreateEvent />
    </EventBuilderContextProvider>
  );
}
