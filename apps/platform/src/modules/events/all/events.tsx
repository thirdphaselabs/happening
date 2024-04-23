"use client";

import { ChevronDownIcon, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { api } from "~/trpc/provider";
import { EventCard } from "../shared/components/event-card";
import { Button, Separator } from "@plaventi/ui";

export function Events() {
  const { data: events, isLoading, error } = api.event.all.useQuery();

  if (isLoading) {
    return null;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Flex direction="column" gap="6">
      <Flex className="w-full" justify="between" align="center">
        <Heading>Events</Heading>
        <Flex gap="4">
          <Button color="gray" variant="soft">
            Actions
            <ChevronDownIcon />
          </Button>
          <Link href="/events/new" className="hidden md:flex">
            <Button>Create new event</Button>
          </Link>
        </Flex>
      </Flex>
      <Separator orientation="horizontal" />
      <Grid
        columns={{
          initial: "1",
          md: "2",
          lg: "3",
          xl: "4",
        }}
        gap="6">
        {events.map((event) => (
          <EventCard key={event.identifier} event={event} />
        ))}
      </Grid>
    </Flex>
  );
}
