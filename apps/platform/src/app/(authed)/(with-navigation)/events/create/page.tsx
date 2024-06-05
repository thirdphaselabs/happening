"use client";

import { EventBuilderContextProvider } from "~/modules/events/create/context/event-builder.context";
import { CreateEvent } from "~/modules/events/create/views/create-event.view";

export default function EventBuilderPageRoot() {
  return (
    <EventBuilderContextProvider>
      <CreateEvent />
    </EventBuilderContextProvider>
  );
}
