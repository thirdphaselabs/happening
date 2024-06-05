import { Flex, Card, Heading, IconButton, Tooltip, Text } from "@radix-ui/themes";
import { PlaventiEvent } from "~/trpc/types";
import { EventStatusBadge } from "./event-status-badge";
import Image from "next/image";
import placeholder from "~/assets/invited-placeholder.png";
import { ArrowRightIcon, GlobeIcon, PersonIcon, SewingPinIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@plaventi/ui";

export function EventCard({ event }: { event: PlaventiEvent }) {
  return (
    <Flex className="w-full">
      <Link href={`/events/details/${event.identifier}`} className="w-full">
        <Flex className="rounded-xl bg-white px-4 py-3">
          <Flex justify="between" className="w-full">
            <Flex direction="column" gap="2">
              <Flex align="center" gap="1">
                <Text color="gray" size="3">
                  21:30
                </Text>
              </Flex>
              <Heading size="5" color="gray" weight="medium" highContrast className="flex items-center gap-2">
                <Tooltip content="This event is public and available in discovery." side="top" align="center">
                  <IconButton size="1" color="sky" variant="soft">
                    <GlobeIcon />
                  </IconButton>
                </Tooltip>
                {event.title}
              </Heading>

              <Flex align="center" gap="1">
                <SewingPinIcon color="gray" />
                <Text color="gray" size="3">
                  Manchester
                </Text>
              </Flex>
              <Flex align="center" gap="1">
                <PersonIcon color="gray" />
                <Text color="gray" size="3">
                  No guests
                </Text>
              </Flex>
              <Button mt="2" variant="soft" color="gray">
                Manage Event
                <ArrowRightIcon />
              </Button>
            </Flex>
            <Flex className="h-[120px] w-[120px]">
              <Image src={placeholder} alt="image" height="120" width="120" className="rounded-lg" />
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Flex>
  );
}
