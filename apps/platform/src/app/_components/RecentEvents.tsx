"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { EventCard } from "~/modules/events/shared/components/event-card";
import { api } from "~/trpc/provider";

export function UpcomingEvents() {
  const { data: events, isLoading, error } = api.event.all.useQuery();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Flex direction="column" gap="6">
      <Heading size="6">Upcoming Events</Heading>
      {(events?.length ?? 0) > 0 && (
        <Grid
          columns={{
            initial: "1",
            md: "2",
            lg: "3",
            xl: "4",
          }}
          gap="6">
          {events?.slice(0, 3).map((event) => (
            <Flex minWidth="450px">
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
