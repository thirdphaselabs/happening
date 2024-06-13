"use client";

import { Button } from "@plaventi/ui";
import {
  ArrowRightIcon,
  BarChartIcon,
  ChatBubbleIcon,
  CheckIcon,
  Cross2Icon,
  DownloadIcon,
  EnvelopeOpenIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Badge, Box, Flex, Heading, IconButton, Separator, Text, TextField, Tooltip } from "@radix-ui/themes";
import { ProgressBar } from "@tremor/react";
import { formatDate } from "date-fns";
import Link from "next/link";
import { UserAvatar } from "~/components/user-avatar";
import { useUser } from "~/modules/auth/user.context";

import { useEventDetails } from "../context/event-details.context";
import { RiGroup2Line, RiGroupLine, RiMailSendLine, RiQrScan2Line } from "@remixicon/react";

export function EventDetailsGuestsView() {
  const { event } = useEventDetails();
  const { user } = useUser();
  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="5">
          <Heading size="5">Guest Overview</Heading>
          <Flex direction="column" gap="3">
            <Flex width="100%" justify="between">
              <Flex align="end" gap="1">
                <Text size="6" weight="medium" color="green">
                  1
                </Text>
                <Text size="3" color="green">
                  guest
                </Text>
              </Flex>
              <Flex align="end" gap="1">
                <Text size="3" className="text-gray8">
                  cap
                </Text>
                <Text size="6" weight="medium" className="text-gray8">
                  500
                </Text>
              </Flex>
            </Flex>
            <ProgressBar color="green" value={1} />
            <Flex width="100%" gap="4">
              <Flex align="center" gap="2">
                <Box className="bg-greenA8 rounded-full p-1" />
                <Text size="2" color="green">
                  1 Going
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box className="bg-orangeA8 rounded-full p-1" />
                <Text size="2" color="orange">
                  1 Pending Approval
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="100%" gap="4">
            <Button
              color="gray"
              variant="surface"
              size="3"
              highContrast
              className="hover:bg-blueA2 hover:border-blueA4 h-fit flex-grow justify-start border-[1px]  border-solid border-transparent bg-white/75 p-2 pr-3 shadow-none">
              <Flex
                className="rounded-lg p-2"
                style={{
                  backgroundColor: "var(--blue-a4)",
                }}>
                <RiMailSendLine
                  xHeight="16"
                  style={{
                    color: "var(--blue-a11)",
                  }}
                />
              </Flex>
              Invite Guests
            </Button>
            <Button
              color="gray"
              variant="surface"
              size="3"
              highContrast
              className="hover:bg-limeA2 hover:border-limeA4 h-fit flex-grow justify-start border-[1px] border-solid border-transparent bg-white/75 p-2 pr-3  shadow-none">
              <Flex
                className="rounded-lg p-2"
                style={{
                  backgroundColor: "var(--lime-a4)",
                }}>
                <RiQrScan2Line
                  xHeight="16"
                  style={{
                    color: "var(--lime-a11)",
                  }}
                />
              </Flex>
              Check In Guests
            </Button>
            <Button
              color="gray"
              variant="surface"
              size="3"
              highContrast
              className="hover:bg-yellowA2 hover:border-yellowA4 h-fit flex-grow justify-start border-[1px] border-solid border-transparent bg-white/75 p-2 pr-3  shadow-none ">
              <Flex
                className="rounded-lg p-2"
                style={{
                  backgroundColor: "var(--yellow-a4)",
                }}>
                <RiGroupLine
                  xHeight="16"
                  style={{
                    color: "var(--yellow-a11)",
                  }}
                />
              </Flex>
              <Flex direction="column" align="start">
                Guest List
                <Text color="gray" size="1">
                  Hidden
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
        <Separator orientation="horizontal" className="bg-grayA3 w-full" />
        <Flex gap="3" direction="column">
          <Flex justify="between" gap="3" align="center">
            <Heading size="5">Guest List</Heading>
            <Link href={`/events/${event.identifier}/guests`}>
              <Tooltip content="Export guest list as CSV" side="top" align="center">
                <IconButton variant="soft" color="gray" size="2">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Flex>
          <Flex>
            <TextField.Root
              variant="surface"
              color="gray"
              placeholder="Search all guests and requests"
              size="3"
              className="border-grayA3 w-full border-[1px] border-solid shadow-none">
              <TextField.Slot>
                <MagnifyingGlassIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex
            direction="column"
            className="border-grayA4 gap-3 rounded-xl border-[1px] border-solid bg-white/75 py-3"
            justify="between">
            <Flex width="100%" justify="between" className="px-3">
              <Flex align="center" gap="3">
                <UserAvatar user={user} />
                <Flex align="center" gap="2">
                  <Text size="3" weight="medium">
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text color="gray" size="3">
                    {user.email}
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" gap="3">
                <Button variant="ghost" color="green">
                  <CheckIcon />
                  Approve
                </Button>
                <Button variant="ghost" color="red">
                  <Cross2Icon />
                  Decline
                </Button>

                <Text size="2" color="gray">
                  {formatDate(new Date(), "d MMM")}
                </Text>
              </Flex>
            </Flex>
            <Separator orientation="horizontal" className="bg-grayA3 w-full" />
            <Flex width="100%" justify="between" className="px-3">
              <Flex align="center" gap="3">
                <UserAvatar user={user} />
                <Flex align="center" gap="2">
                  <Text size="3" weight="medium">
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text color="gray" size="3">
                    {user.email}
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" gap="3">
                <Badge color="green" size="2" radius="full">
                  Going
                </Badge>
                <Text size="2" color="gray">
                  {formatDate(new Date(), "d MMM")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
