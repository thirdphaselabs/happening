"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useMyEvents } from "~/modules/events/events.context";
import { EventCard } from "~/modules/events/shared/components/event-card";

export function UpcomingEvents() {
  const { events } = useMyEvents();

  return (
    <Flex direction="column" gap="6" width="100%">
      <Heading size="6">Upcoming Events</Heading>
      {(events?.length ?? 0) > 0 && (
        <Grid
          width="100%"
          columns={{
            initial: "1",
            md: "2",
          }}
          gap="6">
          {events?.slice(0, 3).map((event) => (
            <Flex minWidth="350px">
              <EventCard key={event.identifier} event={event} />
            </Flex>
          ))}
        </Grid>
      )}
      {events?.length === 0 && <EmptyState />}
    </Flex>
  );
}

function EmptyState() {
  return (
    <Flex direction="column" gap="4" width="100%" align="center" py="5">
      <Heading size="5" color="gray">
        No Upcoming Events
      </Heading>
      <Text size="2" color="gray">
        You have no upcoming events. Create one now.
      </Text>
      <Link href="/events/create">
        <Button color="gray" variant="soft">
          <PlusIcon />
          Create Event
        </Button>
      </Link>
    </Flex>
  );
}
