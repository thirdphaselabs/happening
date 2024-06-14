import { notFound } from "next/navigation";
import { serverClient } from "~/trpc/server";
import { PageParams } from "~/trpc/types";
import { isString } from "~/utils/helpers";
import { EventDetailsDiscoveryInner } from "./components/event-disovery-details";

export async function EventDetailsDiscovery({ params: { identifier } }: PageParams<"identifier">) {
  if (!identifier || !isString(identifier)) return notFound();

  const event = await serverClient.eventDiscovery.byIdentifier.query({ identifier });

  if (!event) {
    return notFound();
  }

  return <EventDetailsDiscoveryInner event={event} />;
}
