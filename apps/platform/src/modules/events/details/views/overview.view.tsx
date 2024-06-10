"use client";

import { Button } from "@plaventi/ui";
import {
  ArrowRightIcon,
  ArrowTopRightIcon,
  BarChartIcon,
  ChatBubbleIcon,
  Pencil2Icon,
  PersonIcon,
  PlusCircledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Badge, Box, Flex, Heading, IconButton, Separator, Text } from "@radix-ui/themes";
import { RiQrScan2Line } from "@remixicon/react";
import { formatDate } from "date-fns";
import Link from "next/link";
import { CalendarIcon } from "~/components/icons/Calendar.icon";
import { LocationIcon } from "~/components/icons/Location.icon";
import { UserAvatar } from "~/components/user-avatar";
import { useUser } from "~/modules/auth/user.context";
import { useEventDetails } from "../context/event-details.context";

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
            className="rounded p-2"
            style={{
              backgroundColor: "var(--gold-a4)",
            }}>
            <PersonIcon
              height="18"
              width="18"
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
            className="rounded p-2"
            style={{
              backgroundColor: "var(--iris-a4)",
            }}>
            <ChatBubbleIcon
              height="18"
              width="18"
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
            className="rounded p-2"
            style={{
              backgroundColor: "var(--green-a4)",
            }}>
            <BarChartIcon
              height="18"
              width="18"
              style={{
                color: "var(--green-a11)",
              }}
            />
          </Flex>
          View Insights
        </Button>
      </Flex>
      <Flex width="100%" className="mb-5 gap-3 rounded-xl bg-white/75 p-3">
        <Flex className="w-1/2">
          <Flex className="bg-grayA2 w-full items-end justify-end rounded-lg p-2 ">
            <Button
              className="w-full justify-between bg-black/30 tracking-tight text-white"
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
                {formatDate(new Date(), "EEE d MMM")}
              </Text>
              <Text size="2" color="gray">
                22:00 - 04:00 UTC
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" width="100%" gap="3">
            <LocationIcon />
            <Flex direction="column">
              <Text size="3" weight="medium">
                Hï Ibiza
              </Text>
              <Text size="2" color="gray">
                Platja d'en Bossa, 07817, Illes Balears, Spain
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
          <Box className="bg-grayA4 h-[44px] w-full rounded-xl" />
          <Flex justify="between" gap="3" align="center">
            <Heading size="5">Recent Registrations</Heading>
            <Link href={`/events/${event.identifier}/guests`}>
              <Button variant="soft" color="gray">
                All Guests
                <ArrowRightIcon />
              </Button>
            </Link>
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
