"use client";

import { EventTimeline } from "~/modules/event-management/all/components/event-timeline";
import { useMyEvents } from "~/modules/event-management/events.context";

export function ManageTeamEvents() {
  const { events } = useMyEvents();

  return <EventTimeline events={events} />;
}
