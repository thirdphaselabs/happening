"use client";

import { Text, Flex, Grid, Heading, SegmentedControl, Box } from "@radix-ui/themes";
import Link from "next/link";
import { api } from "~/trpc/provider";
import { EventCard } from "../shared/components/event-card";
import { Button, Separator } from "@plaventi/ui";
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { formatDate } from "date-fns";
import { EventTimeline } from "./components/event-timeline";

export function Events() {
  const { data: events, isLoading, error } = api.event.all.useQuery();

  const [category, setCategory] = useState<"upcoming" | "past">("upcoming");

  if (isLoading) {
    return null;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const eventsByCategory = events.filter((event) => {
    if (category === "upcoming") {
      return new Date(event.timing.startDate).getTime() > new Date().getTime();
    }
    if (category === "past") {
      return new Date(event.timing.startDate).getTime() < new Date().getTime();
    }
  });

  const eventsGroupedByStartDate = eventsByCategory.reduce(
    (acc, event) => {
      const startDate = new Date(event.timing.startDate);
      const key = startDate.toDateString();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(event);
      return acc;
    },
    {} as Record<string, typeof events>,
  );

  return (
    <Flex direction="column" gap="6" mt="6">
      <Flex className="w-full" justify="between" align="center">
        <Heading size="8">Events</Heading>
        <Flex gap="4">
          <SegmentedControl.Root
            value={category}
            onValueChange={(val) => (val === "upcoming" ? setCategory("upcoming") : setCategory("past"))}>
            <SegmentedControl.Item value="upcoming">Upcoming</SegmentedControl.Item>
            <SegmentedControl.Item value="past">Past</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
      </Flex>
      {events.length > 0 && <EventTimeline events={eventsByCategory} />}
      {eventsByCategory.length === 0 && <EmptyState category={category} />}
    </Flex>
  );
}

function EmptyState({ category }: { category: "upcoming" | "past" }) {
  return (
    <Flex direction="column" gap="6" width="100%" align="center" py="5">
      <Flex direction="column" gap="3" align="center">
        <Heading size="6" color="gray">
          No {category === "upcoming" ? "Upcoming" : "Past"} Events
        </Heading>
        <Text size="3" color="gray">
          {category === "upcoming"
            ? "You have no upcoming events. Create one now."
            : "You have not hosted or attended any event."}
        </Text>
      </Flex>
      {category === "upcoming" && (
        <Link href="/events/create">
          <Button color="gray" variant="soft">
            <PlusIcon />
            Create Event
          </Button>
        </Link>
      )}
    </Flex>
  );
}
