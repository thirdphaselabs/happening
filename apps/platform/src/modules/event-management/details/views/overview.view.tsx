"use client";

import { Button } from "@plaventi/ui";
import {
  ArrowRightIcon,
  ArrowTopRightIcon,
  BarChartIcon,
  ChatBubbleIcon,
  CheckIcon,
  Cross2Icon,
  Pencil2Icon,
  PersonIcon,
  PlusCircledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Badge, Box, Flex, Heading, IconButton, Separator, Text } from "@radix-ui/themes";
import {
  RiBarChartGroupedLine,
  RiChat4Line,
  RiGroupLine,
  RiMessage2Line,
  RiQrScan2Line,
} from "@remixicon/react";
import { formatDate } from "date-fns";
import Link from "next/link";
import { CalendarIcon } from "~/components/icons/Calendar.icon";
import { LocationIcon } from "~/components/icons/Location.icon";
import { UserAvatar } from "~/components/user-avatar";
import { useUser } from "~/modules/auth/user.context";
import { Card, ProgressBar } from "@tremor/react";

import { useEventDetails } from "../context/event-details.context";
import Image from "next/image";
import EventDetailsDiscovery from "~/app/event/[identifier]/page";
import { EventDetailsDiscoveryInner } from "~/modules/event-discovery/details/components/event-disovery-details";

export function EventDetailsOverviewView() {
  const { event } = useEventDetails();
  const { user } = useUser();
  return (
    <Flex direction="column" gap="5">
      <Flex width="100%" gap="4">
        <Button
          color="gray"
          variant="surface"
          size="3"
          highContrast
          className="hover:bg-goldA2 hover:border-goldA4 h-fit flex-grow justify-start border-[1px]  border-solid border-transparent bg-white/75 p-2 pr-3 shadow-none">
          <Flex
            className="rounded-lg p-2"
            style={{
              backgroundColor: "var(--gold-a4)",
            }}>
            <RiGroupLine
              xHeight="16"
              style={{
                color: "var(--gold-a11)",
              }}
            />
          </Flex>
          Manage Guests
        </Button>
        <Button
          color="gray"
          variant="surface"
          size="3"
          highContrast
          className="hover:bg-irisA2 hover:border-irisA4 h-fit flex-grow justify-start border-[1px] border-solid border-transparent bg-white/75 p-2 pr-3  shadow-none">
          <Flex
            className="rounded-lg p-2"
            style={{
              backgroundColor: "var(--iris-a4)",
            }}>
            <RiMessage2Line
              xHeight="16"
              style={{
                color: "var(--iris-a11)",
              }}
            />
          </Flex>
          Send a Message
        </Button>
        <Button
          color="gray"
          variant="surface"
          size="3"
          highContrast
          className="hover:bg-greenA2 hover:border-greenA4 h-fit flex-grow justify-start border-[1px] border-solid border-transparent bg-white/75 p-2 pr-3  shadow-none ">
          <Flex
            className="rounded-lg p-2"
            style={{
              backgroundColor: "var(--green-a4)",
            }}>
            <RiBarChartGroupedLine
              xHeight="16"
              style={{
                color: "var(--green-a11)",
              }}
            />
          </Flex>
          View Insights
        </Button>
      </Flex>
      <Flex width="100%" className="mb-5 gap-4 rounded-xl bg-white/75 p-3">
        <Flex className="w-1/2">
          <Flex className="bg-grayA2 relative w-full items-end justify-end overflow-hidden rounded-lg p-2 ">
            {/* <figure> */}
            <Box
              style={{
                transform: "scale(0.35)",
                overflow: "hidden",
                width: "950px",
                height: "776px",
                left: "24px",
                position: "absolute",
                transformOrigin: "0 0",
                top: "12px",
                padding: "8px",
              }}>
              <EventDetailsDiscoveryInner event={event} />
            </Box>
            {/* </figure> */}
            {/* <Image
              src={event.imageUrl}
              layout="fill"
              objectFit="cover"
              className="absolute h-full w-full rounded-lg"
              alt="ecentr"
              quality={100}
            /> */}
            <Button
              className="bg-gray12/90 w-full justify-between tracking-tight text-white"
              variant="soft"
              color="gray"
              size="2">
              <Flex gap="2" align="center">
                plaveti.com/px232msd32
                <ArrowTopRightIcon />
              </Flex>
              <Text className="text-white/60">COPY</Text>
            </Button>
          </Flex>
        </Flex>
        <Flex className="w-1/2" mt="3" direction="column" gap="4">
          <Heading size="4">When & Where</Heading>
          <Flex align="center" width="100%" gap="3">
            <CalendarIcon date={new Date()} />
            <Flex direction="column">
              <Text size="3" weight="medium">
                {formatDate(event.timing.startDate, "EEE d MMM")}
              </Text>
              <Text size="2" color="gray">
                22:00 - 04:00 UTC
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" width="100%" gap="3">
            <Flex>
              <LocationIcon />
            </Flex>
            <Flex direction="column">
              <Text size="3" weight="medium">
                {event.location.name}
              </Text>
              <Text size="2" color="gray">
                {event.location.formattedAddress}
              </Text>
            </Flex>
          </Flex>
          <Text size="1" color="gray">
            This address is shown publicly on the event page.
          </Text>
          <Button variant="soft" color="gray" size="2">
            <RiQrScan2Line xHeight="15" />
            Check In Guests
          </Button>

          <Flex width="100%" gap="3" position="relative">
            <Flex className="w-1/2">
              <Button variant="soft" color="gray" size="2" className="w-full">
                Edit Event
              </Button>
            </Flex>
            <Flex className="w-1/2">
              <Button variant="soft" color="gray" size="2" className="w-full">
                Change photo
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="5">
          <Heading size="6">Guests</Heading>
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
          <Flex justify="between" gap="3" align="center">
            <Heading size="4">Recent Registrations</Heading>
            <Link href={`/events/${event.identifier}/guests`}>
              <Button variant="soft" color="gray">
                All Guests
                <ArrowRightIcon />
              </Button>
            </Link>
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
        <Separator orientation="horizontal" className="bg-grayA3 w-full" />
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="2">
            <Flex justify="between" gap="3" align="center">
              <Heading size="6">Hosts</Heading>
              <Link href={`/events/${event.identifier}/guests`}>
                <Button variant="soft" color="gray">
                  <PlusIcon />
                  Add Host
                </Button>
              </Link>
            </Flex>
            <Flex>
              <Text size="3" color="gray">
                Add hosts, special guests, and event managers.
              </Text>
            </Flex>
          </Flex>
          <Flex
            className="border-grayA4 gap-3 rounded-xl border-[1px] border-solid bg-white/75 p-3"
            justify="between">
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
              <Badge color="green" size="2" radius="full">
                Creator
              </Badge>
            </Flex>

            <Flex align="center" gap="3">
              <IconButton color="gray" variant="ghost">
                <Pencil2Icon />
              </IconButton>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
