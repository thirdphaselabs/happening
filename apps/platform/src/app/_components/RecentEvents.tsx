"use client";
import { Card } from "@plaventi/ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Flex, Grid, Heading, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import blackCoffee from "~/assets/black-coffee.png";
import createEvent from "~/assets/create-event.svg";
import food from "~/assets/food.png";
import { NotificationCallout } from "./Notification";
import { api } from "~/trpc/provider";
import { EventCard } from "~/modules/events/shared/components/event-card";

export function RecentEvents() {
  const { data: events, isLoading, error } = api.event.all.useQuery();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Flex direction="column" gap="6">
      <Heading size="5">Recent Events</Heading>
      <Grid
        columns={{
          initial: "1",
          md: "2",
          lg: "3",
          xl: "4",
        }}
        gap="6">
        <Flex>
          <Link href="/events/new" className="h-full w-full">
            <Card.Root>
              <Card.Image src={createEvent} alt="Create Event" hasNoPadding />
              <Card.Header>Create Event</Card.Header>
            </Card.Root>
          </Link>
        </Flex>
        {events?.slice(0, 3).map((event) => <EventCard key={event.identifier} event={event} />)}
      </Grid>
    </Flex>
  );
}
