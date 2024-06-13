import { Flex, Heading, Box, Text } from "@radix-ui/themes";
import { formatDate } from "date-fns";
import { EventCard } from "../../shared/components/event-card";
import { PlaventiEvent } from "~/trpc/types";

export function EventTimeline({ events }: { events: PlaventiEvent[] }) {
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
    <Flex direction="column" overflow="hidden" gap="6">
      {Object.entries(eventsGroupedByStartDate)
        .sort((a, b) => {
          return new Date(a[0]).getTime() - new Date(b[0]).getTime();
        })
        .map(([date, events]) => (
          <Flex justify="between">
            <Flex direction="column" gap="1" className="flex-grow">
              <Heading size="3" color="gray" highContrast>
                {formatDate(new Date(date), "d MMM")}
              </Heading>
              <Text size="3" color="gray">
                {formatDate(new Date(date), "EEEE")}
              </Text>
            </Flex>
            <Flex mx="6" mt="2" position="relative" className="w-fit">
              <Box className="bg-grayA6 z-[100] flex h-[8px] w-[8px] items-center justify-center rounded-full" />
              <Box className="border-grayA5 absolute left-[3px] top-[9px] h-[210px] w-[2px] border-r-[1px] border-dashed" />
            </Flex>
            <Flex direction="column" className="w-3/4" gap="6">
              {events.map((event) => (
                <Flex>
                  <EventCard key={event.identifier} event={event} />
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
}
