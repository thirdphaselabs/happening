"use client";

import {
  AspectRatio,
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useEventBuilderContext } from "~/modules/events/builder/context/event-builder.context";
import Image from "next/image";
import placeholder from "~/assets/invited-placeholder.png";
import { CaretDownIcon, GlobeIcon, ImageIcon } from "@radix-ui/react-icons";
import { Button, Separator, TextFieldInput } from "@plaventi/ui";
import { useTextareaAutoHeight } from "~/app/_hooks/useAutoReszieTextArea";
import { useRef } from "react";
import { formatDate } from "date-fns";
import { TimeSelect } from "~/app/_components/TimeSelect";
import { TimezoneSelect } from "~/app/_components/TimezoneSelect";

export default function EventBuilderPageRoot() {
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
      <Flex className="flex-grow" direction="column" gap="5">
        <Flex width="100%" justify="between">
          <Button variant="soft" color="gray" size="2">
            <Avatar fallback="95" size="1" radius="full" />
            9-5 Events
            <CaretDownIcon />
          </Button>
          <Button variant="soft" color="gray" size="2">
            <GlobeIcon />
            Public
            <CaretDownIcon />
          </Button>
        </Flex>
        <TextArea
          ref={ref}
          autoFocus
          placeholder="Event Name"
          variant="surface"
          size="2"
          rows={1}
          id="create-event-name"
          className="text text-wrap rounded-none border-none bg-transparent px-0 text-[40px] font-bold tracking-tight outline-none"
          style={{ boxShadow: "none", textIndent: 0, height: "fit-content" }}
        />

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
                <TextFieldInput
                  value={formatDate(new Date(), "EEE, d MMM")}
                  variant="soft"
                  color="gray"
                  size="2"
                  className="flex-grow text-[16px]"
                />
                <TimeSelect />
              </Flex>
              <Flex gap="1">
                <TextFieldInput
                  value={formatDate(new Date(), "EEE, d MMM")}
                  variant="soft"
                  color="gray"
                  size="2"
                  className="flex-grow text-[16px]"
                />
                <TimeSelect />
              </Flex>
            </Flex>
          </Flex>
          <TimezoneSelect />
        </Flex>
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
