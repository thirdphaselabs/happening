"use client";

import { Button, Separator, TextFieldInput, TicketIcon } from "@plaventi/ui";
import {
  BarChartIcon,
  CaretDownIcon,
  ImageIcon,
  Pencil2Icon,
  ReaderIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import {
  AspectRatio,
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Switch,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { formatDate } from "date-fns";
import Image from "next/image";
import { useRef } from "react";
import { GoVerified } from "react-icons/go";
import { TimeSelect } from "~/app/_components/TimeSelect";
import { TimezoneSelect } from "~/app/_components/TimezoneSelect";
import { useTextareaAutoHeight } from "~/app/_hooks/useAutoReszieTextArea";
import placeholder from "~/assets/invited-placeholder.png";
import { VisibilitySelector } from "~/modules/events/create/components/visibility-selector";
import { useEventBuilderContext } from "../context/event-builder.context";
import { EventName } from "../components/event-name";
import { EventDescription } from "../components/event-description";
import { DateSelect } from "../components/date-select";
import { AddPaidTicketGroupDialog } from "../components/add-paid-ticket-group-dialog";

export function CreateEvent() {
  const { setEventDetails, eventDetails, createEvent } = useEventBuilderContext();
  const ref = useRef<HTMLTextAreaElement>(null);
  useTextareaAutoHeight({ ref });

  const timeZoneOffset = getTimeZoneOffset();
  const timeZoneName = getTimeZoneName();

  return (
    <Flex width="100%" gap="6">
      <Flex direction="column" gap="5">
        <Flex className="h-[330px] w-[330px]">
          <AspectRatio ratio={1 / 1}>
            <Image src={placeholder} alt="Event" layout="fill" objectFit="cover" className="rounded-xl" />
            <IconButton size="3" className="absolute bottom-2 right-2 z-10" color="gray" variant="surface">
              <ImageIcon height="20" width="20" />
            </IconButton>
          </AspectRatio>
        </Flex>
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
          <Button variant="soft" color="gray" size="2">
            <Avatar fallback="95" size="1" radius="full" />
            9-5 Events
            <CaretDownIcon />
          </Button>
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
                <DateSelect date="start" />

                <TimeSelect date="start" />
              </Flex>
              <Flex gap="1">
                <DateSelect date="end" />
                <TimeSelect date="end" />
              </Flex>
            </Flex>
          </Flex>
          <TimezoneSelect />
        </Flex>
        <Flex gap="2" className="bg-skyA2 rounded-xl px-3 py-2" width="100%">
          <Flex align="start" className="mt-1">
            <SewingPinIcon height="16" width="16" color="gray" />
          </Flex>
          <Flex direction="column">
            <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
              Add Event Location
            </Heading>
            <Text color="gray" size="2">
              Real world location or virtual link.
            </Text>
          </Flex>
        </Flex>
        <EventDescription />
        <Flex direction="column">
          <Heading size="2" color="gray" my="2">
            Additional options
          </Heading>
          <Flex gap="2" className="bg-skyA2 rounded-xl rounded-b-none px-3 py-2" width="100%">
            <Flex align="start" className="mt-1">
              <TicketIcon height="16" width="16" color="gray" />
            </Flex>
            <Flex justify="between" width="100%">
              <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
                Tickets
              </Heading>
              <AddPaidTicketGroupDialog />
            </Flex>
          </Flex>
          <Separator orientation="horizontal" className="w-full" />
          <Flex gap="2" className="bg-skyA2  px-3 py-2" width="100%">
            <Flex align="start" className="mt-1">
              <GoVerified height="16" width="16" color="gray" />
            </Flex>
            <Flex justify="between" width="100%">
              <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
                Require approval
              </Heading>
              <Switch />
            </Flex>
          </Flex>
          <Separator orientation="horizontal" className="w-full" />
          <Flex gap="2" className="bg-skyA2 rounded-xl  rounded-t-none px-3 py-2" width="100%">
            <Flex align="start" className="mt-1">
              <BarChartIcon height="16" width="16" color="gray" />
            </Flex>
            <Flex justify="between" width="100%">
              <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
                Capacity
              </Heading>
              <Button variant="ghost" color="gray" size="3">
                Unlimited
                <Pencil2Icon />
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Button size="4" onClick={createEvent}>
          Create Event
        </Button>
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
