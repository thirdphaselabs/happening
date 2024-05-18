"use client";

import {
  ArrowTopRightIcon,
  ImageIcon,
  CalendarIcon,
  SewingPinIcon,
  CaretDownIcon,
} from "@radix-ui/react-icons";
import { Flex, Card, Heading, Button, Skeleton, Separator, TextArea, Badge, Text } from "@radix-ui/themes";
import { useEventBuilderContext } from "../context/event-builder.context";
import { ConditionalSkeleton } from "~/components/ConditionalSkeleton";
import { format } from "util";
import { formatDateWithOrdinal, formatDateWithWeekdayAndOrdinal } from "~/lib/utils";

export function EventPreview() {
  const { eventDetails, dateAndTime } = useEventBuilderContext();

  return (
    <Card className="bg-gray2 h-fit w-full p-6">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Heading size="5">Preview your event</Heading>
          <Button size="2" variant="ghost" color="gray">
            View full screen <ArrowTopRightIcon />
          </Button>
        </Flex>
        <Card className="h-full w-full p-0">
          <Flex direction="column" gap="4">
            <Flex className="bg-gray2 h-[200px] rounded-b-md" justify="center" align="center">
              <ImageIcon height="24" width="24" />
            </Flex>
            <Flex direction="column" gap="5" px="4" pb="4">
              <Flex direction="column" gap="2">
                <ConditionalSkeleton loading={!dateAndTime?.startDate}>
                  <Text size="2" color="gray">
                    {dateAndTime?.startDate
                      ? formatDateWithOrdinal(dateAndTime.startDate)
                      : "12th August 2021"}
                  </Text>
                </ConditionalSkeleton>
                <ConditionalSkeleton loading={!eventDetails?.name}>
                  <Heading size="3">{eventDetails?.name ?? "Event title"}</Heading>
                </ConditionalSkeleton>
                <ConditionalSkeleton loading={!eventDetails?.description}>
                  <Text size="2" color="gray">
                    {eventDetails?.description ?? "Event title ajsbijabsijabs"}
                  </Text>
                </ConditionalSkeleton>
              </Flex>
              <Separator className="w-full" />
              <Flex direction="column" justify="between" gap="2">
                <Heading size="3">Date & Time</Heading>
                <Flex align="center" gap="2">
                  <CalendarIcon className="text-gray10" />
                  <ConditionalSkeleton loading={!dateAndTime?.startDate}>
                    <Text size="2" color="gray">
                      {dateAndTime?.startDate ? (
                        <>Starts on {formatDateWithWeekdayAndOrdinal(dateAndTime.startDate)}</>
                      ) : (
                        "Start on 12th August 2021"
                      )}
                    </Text>
                  </ConditionalSkeleton>
                </Flex>
              </Flex>
              <Flex direction="column" align="start" gap="2">
                <Heading size="3">Location</Heading>
                <Flex align="center" gap="2">
                  <SewingPinIcon className="text-gray10" />
                  <Skeleton className="w-fit">
                    <Text size="2" color="gray">
                      Manchester, UK
                    </Text>
                  </Skeleton>
                </Flex>
                <Button size="1" variant="ghost">
                  Show full address
                  <CaretDownIcon />
                </Button>
              </Flex>
              <Flex direction="column" align="start" gap="2">
                <Heading size="3">About this event</Heading>
                <Skeleton className="w-fit">
                  <TextArea rows={4} className="w-full" size="2" color="gray">
                    Manchester, UK
                  </TextArea>
                </Skeleton>
              </Flex>
              <Flex direction="column" justify="between" gap="2">
                <Heading size="3">Tags</Heading>
                <Flex align="center" gap="2">
                  <Flex>
                    <Skeleton className="w-fit">
                      <Badge>Food</Badge>
                    </Skeleton>
                  </Flex>
                  <Flex>
                    <Skeleton className="w-fit">
                      <Badge>Music</Badge>
                    </Skeleton>
                  </Flex>
                  <Flex>
                    <Skeleton className="w-fit">
                      <Badge>Baby shower</Badge>
                    </Skeleton>
                  </Flex>
                  <Flex>
                    <Skeleton className="w-fit">
                      <Badge>Wedding</Badge>
                    </Skeleton>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Card>
  );
}
