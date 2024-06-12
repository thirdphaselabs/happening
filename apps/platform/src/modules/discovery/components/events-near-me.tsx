"use client";

import { Flex, Heading, Box, Text } from "@radix-ui/themes";
import { useMapEvents } from "@vis.gl/react-google-maps/dist/components/map/use-map-events";
import { formatDate } from "date-fns";
import { useMyEvents } from "~/modules/events/events.context";
import { EventCard } from "~/modules/events/shared/components/event-card";
import { PlaventiEvent } from "~/trpc/types";

export function EventsNearMe() {
  const { events } = useMyEvents();

  const eventsGroupedByStartDate = events.reduce(
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
    <Flex direction="column" gap="6">
      {Object.entries(eventsGroupedByStartDate)
        .sort((a, b) => {
          return new Date(a[0]).getTime() - new Date(b[0]).getTime();
        })
        .map(([date, events]) => (
          <Flex justify="between" gap="4">
            <Flex mt="2" position="relative" className="w-fit">
              <Box className="bg-grayA6 z-[100] flex h-[8px] w-[8px] items-center justify-center rounded-full" />
              <Box className="border-grayA5 absolute left-[3px] top-[9px] h-[210px] w-[2px] border-r-[1px] border-dashed" />
            </Flex>

            <Flex direction="column" className="flex-grow" gap="2">
              <Flex gap="2">
                <Text weight="bold" highContrast size="3">
                  Today
                </Text>{" "}
                <Text size="3" color="gray">
                  {formatDate(new Date(date), "d MMM")}
                </Text>
              </Flex>
              <Flex direction="column" gap="6">
                {[...events, ...events, ...events, ...events].map((event) => (
                  <Flex>
                    <EventCard key={event.identifier} event={event} />
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
}
