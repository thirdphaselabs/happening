import { notFound } from "next/navigation";
import { EventDetails } from "~/modules/events/details/event-details";
import { PageParams } from "~/trpc/types";

export default function EventDetailsPage({ params: { identifier } }: PageParams<"identifier">) {
  if (!identifier) return notFound();

  return <EventDetails identifier={identifier} />;
}
