import { Button } from "@plaventi/ui";
import { ArrowRightIcon, GlobeIcon, PersonIcon, SewingPinIcon } from "@radix-ui/react-icons";
import { Badge, Flex, Heading, IconButton, Text, Tooltip } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import placeholder from "~/assets/invited-placeholder.png";
import { PlaventiEvent } from "~/trpc/types";

export function EventCard({ event }: { event: PlaventiEvent }) {
  return (
    <Flex className="w-full">
      <Link href={`/events/details/${event.identifier}`} className="w-full">
        <Flex className="hover:border-grayA4 rounded-xl border-[1px] border-solid border-white/50 bg-white/50 p-3 pl-4 transition duration-200 ease-in-out hover:shadow-sm">
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

              <Flex direction="column" gap="1">
                <Flex align="center" gap="1" mt="2px">
                  <Flex width="20px">
                    <SewingPinIcon color="gray" height="16" width="16" className="text-gray9" />
                  </Flex>
                  <Text color="gray" size="3" className="text-gray9 tracking-tight">
                    Manchester
                  </Text>
                </Flex>
                <Flex align="center" gap="1">
                  <Flex width="20px">
                    <PersonIcon color="gray" height="16" width="16" className="text-gray9" />
                  </Flex>
                  <Text color="gray" size="3" className="text-gray9 tracking-tight">
                    No guests
                  </Text>
                </Flex>
              </Flex>

              <Button variant="soft" color="gray" mt="1">
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
