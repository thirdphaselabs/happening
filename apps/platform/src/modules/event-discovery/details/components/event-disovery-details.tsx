import { Flex, AspectRatio, Heading, Separator, Avatar, Badge, Text, Link } from "@radix-ui/themes";
import { formatDate } from "date-fns";
import { LocationIcon } from "~/components/icons/Location.icon";
import { MapComponent } from "~/modules/event-management/create/components/map";
import { PlaventiEvent } from "~/trpc/types";
import { CopyAddress } from "./copy-address";
import { GetTickets } from "./get-tickets";
import { ViewLocation } from "./view-location";
import Image from "next/image";
import { CalendarIcon } from "~/components/icons/Calendar.icon";
import { BuyTickets } from "./buy-tickets";

export function EventDetailsDiscoveryInner({ event }: { event: PlaventiEvent }) {
  return (
    <>
      <Flex width="100%" gap="6">
        <Flex direction="column" gap="5">
          <Flex className="h-[330px] w-[330px]">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={event.imageUrl}
                alt="Event"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
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

          <GetTickets event={event} />

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
            <MapComponent location={event.location} />
            {/* <EventDetailsMap location={event.location} /> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
