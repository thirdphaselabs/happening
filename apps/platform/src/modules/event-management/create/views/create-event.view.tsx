"use client";

import { Button, Separator } from "@plaventi/ui";
import { ImageIcon } from "@radix-ui/react-icons";
import { AspectRatio, Avatar, Box, Flex, Heading, IconButton, Switch, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRef } from "react";
import { GoVerified } from "react-icons/go";
import { TimeSelect } from "~/app/_components/TimeSelect";
import { TimezoneSelect } from "~/app/_components/TimezoneSelect";
import { useTextareaAutoHeight } from "~/app/_hooks/useAutoReszieTextArea";

import { Capacity } from "../components/capacity";
import { DateSelect } from "../components/date-select";
import { EventDescription } from "../components/event-description";
import { EventLocation } from "../components/event-location";
import { EventName } from "../components/event-name";
import { Tickets } from "../components/tickets";
import { useEventBuilderContext } from "../context/event-builder.context";
import { EventImage } from "../components/event-image";
import { VisibilitySelector } from "../components/visibility-selector";

export function CreateEvent() {
  const {
    isLoading,
    errors,
    setEventDetails,
    eventDetails,
    createEvent,
    setDateAndTime,
    dateAndTime,
    setAdditionalInformation,
  } = useEventBuilderContext();
  const ref = useRef<HTMLTextAreaElement>(null);
  useTextareaAutoHeight({ ref });

  const timeZoneOffset = getTimeZoneOffset();
  const timeZoneName = getTimeZoneName();

  return (
    <Flex width="100%" gap="6">
      <Flex direction="column" gap="5">
        <EventImage />
        <Flex direction="column" width="100%" gap="2">
          <Heading size="2" color="gray">
            Hosted By
          </Heading>
          <Separator orientation="horizontal" className="w-full" />
          <Flex align="center" gap="2">
            <Avatar fallback="RJ" size="1" radius="full" />
            <Text size="2" weight="medium">
              Reece Johnson
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="flex-grow" direction="column" gap="4">
        <Flex width="100%" justify="between">
          <Flex align="center" gap="1">
            <Avatar fallback="95" size="1" radius="full" />
            <Text size="2" color="gray" weight="medium">
              9-5 Events
            </Text>
          </Flex>
          <VisibilitySelector />
        </Flex>
        <EventName />

        <Flex gap="3">
          <Flex className="bg-skyA2 rounded-xl p-1 pl-3" width="100%" justify="between">
            <Flex direction="column" gap="1" position="relative">
              <Flex className=" h-[32px] w-full items-center gap-2 rounded-[4px] px-2">
                <Box className="bg-skyA6 z-10 flex h-[12px] w-[12px] items-center justify-center rounded-full" />
                <Text color="gray" size="3">
                  Start
                </Text>
              </Flex>
              <Flex className=" h-[32px] w-full items-center gap-2 rounded-[4px] px-2">
                <Box className="border-1 border-skyA6 z-10 flex h-[12px] w-[12px] items-center justify-center rounded-full border" />
                <Text color="gray" size="3">
                  End
                </Text>
              </Flex>
              <Box className="border-skyA6 absolute left-[13.5px] top-[21px] h-[24px] w-[1px] border-r-[1px] border-dashed" />
            </Flex>
            <Flex direction="column" gap="1">
              <Flex gap="1">
                <DateSelect
                  size="2"
                  variant="soft"
                  date="start"
                  defaultValue={dateAndTime?.startDate}
                  onSelect={(val) => {
                    setDateAndTime({ startDate: val });
                  }}
                />

                <TimeSelect
                  size="2"
                  variant="soft"
                  date="start"
                  defaultValue={dateAndTime?.startTime}
                  onSelect={(val) => {
                    setDateAndTime({ startTime: val });
                  }}
                />
              </Flex>
              <Flex gap="1">
                <DateSelect
                  size="2"
                  variant="soft"
                  date="end"
                  defaultValue={dateAndTime?.endDate}
                  onSelect={(val) => {
                    setDateAndTime({ endDate: val });
                  }}
                />
                <TimeSelect
                  size="2"
                  variant="soft"
                  date="end"
                  defaultValue={dateAndTime?.endTime}
                  onSelect={(val) => {
                    setDateAndTime({ endTime: val });
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
          <TimezoneSelect />
        </Flex>
        <EventLocation />
        <EventDescription />
        <Flex direction="column">
          <Heading size="2" color="gray" my="2">
            Additional options
          </Heading>
          <Tickets />
          <Separator orientation="horizontal" className="w-full" />
          <Flex gap="2" className="bg-skyA2  px-3 py-2" width="100%">
            <Flex align="start" className="mt-1">
              <GoVerified height="16" width="16" color="gray" />
            </Flex>
            <Flex justify="between" width="100%">
              <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
                Require approval
              </Heading>
              <Switch onCheckedChange={(val) => setAdditionalInformation({ requiresApproval: val })} />
            </Flex>
          </Flex>
          <Separator orientation="horizontal" className="w-full" />
          <Capacity />
        </Flex>
        <Button size="4" onClick={createEvent} loading={{ isLoading }}>
          Create Event
        </Button>
        {Object.values(errors).some((v) => v !== null) && <Text color="red">{JSON.stringify(errors)}</Text>}
      </Flex>
    </Flex>
  );
}

function getTimeZoneOffset() {
  const offset = new Date().getTimezoneOffset();
  const absOffset = Math.abs(offset);
  const hours = Math.floor(absOffset / 60);
  const minutes = absOffset % 60;
  const sign = offset <= 0 ? "+" : "-";
  return `GMT${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getTimeZoneName() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
