import { Separator } from "@plaventi/ui";
import { ArrowTopRightIcon, CopyIcon } from "@radix-ui/react-icons";
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { Icon } from "@tremor/react";
import { formatDate } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarIcon } from "~/components/icons/Calendar.icon";
import { LocationIcon } from "~/components/icons/Location.icon";
import { EventDetailsMap, MapComp } from "~/modules/event-management/create/components/map";
import { serverClient } from "~/trpc/server";
import { PageParams } from "~/trpc/types";
import { isString } from "~/utils/helpers";
import { CopyAddress } from "./components/copy-address";
import { ViewLocation } from "./components/view-location";

export async function EventDetailsDiscovery({
  params: { identifier },
}: PageParams<"identifier"> & { children: React.ReactNode }) {
  if (!identifier || !isString(identifier)) return notFound();

  const event = await serverClient.eventDiscovery.byIdentifier.query({ identifier });

  if (!event) {
    return notFound();
  }

  return (
    <Flex width="100%" gap="6">
      <Flex direction="column" gap="5">
        <Flex className="h-[330px] w-[330px]">
          <AspectRatio ratio={1 / 1}>
            <Image src={event.imageUrl} alt="Event" layout="fill" objectFit="cover" className="rounded-xl" />
          </AspectRatio>
        </Flex>
        <Flex direction="column" width="100%" gap="5">
          <Flex direction="column" gap="2">
            <Heading size="2" color="gray">
              Hosted By
            </Heading>
            <Separator orientation="horizontal" className="w-full" />
            <Flex align="center" gap="2">
              <Avatar fallback="95" size="1" radius="full" />
              <Text size="2" color="gray" weight="medium">
                {/* TODO: add team /host to event  */}
                9-5 Events
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" gap="2">
            <Link size="2" color="gray" href="/events/create" weight="medium" className="text-grayA9">
              Contact The Host
            </Link>
            <Link size="2" color="gray" href="/events/create" weight="medium" className="text-grayA9">
              Report Event
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="flex-grow" direction="column" gap="6">
        <Flex direction="column" gap="4">
          <Flex width="100%" justify="between">
            <Badge size="2" variant="soft" color="amber">
              Limited Availability
            </Badge>
          </Flex>

          <Heading size="8" className="text-[40px] tracking-tighter">
            {event.title}
          </Heading>

          <Flex gap="3">
            <Flex mt="3" direction="column" gap="4">
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
                  <Text size="3" weight="medium" className="flex items-center gap-1">
                    {event.location.name}
                    <ViewLocation event={event} />
                  </Text>
                  <Text size="2" color="gray">
                    {event.location.formattedAddress}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" gap="2">
          <Heading size="3">About Event</Heading>
          <Separator orientation="horizontal" className="w-full" />
          {event.description.split("\n").map((text) => (
            <Text size="3" color="gray">
              {text}
            </Text>
          ))}
        </Flex>

        <Flex direction="column" gap="2">
          <Heading size="3">Location</Heading>
          <Separator orientation="horizontal" className="w-full" />
          <Flex direction="column" mb="1">
            <Heading size="2">{event.location.name}</Heading>
            <Text size="2" color="gray" className="flex items-center gap-1">
              {event.location.formattedAddress}
              <CopyAddress event={event} />
            </Text>
          </Flex>
          <EventDetailsMap location={event.location} />
        </Flex>
      </Flex>
    </Flex>
  );
}
