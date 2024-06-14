import { GlobeIcon, PersonIcon, SewingPinIcon } from "@radix-ui/react-icons";
import { AspectRatio, Avatar, Flex, Heading, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { RiMapPin2Line } from "@remixicon/react";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { LocationIcon } from "~/components/icons/Location.icon";
import { PlaventiEvent } from "~/trpc/types";

export function EventDiscoveryCard({ event }: { event: PlaventiEvent }) {
  return (
    <Flex className="w-full">
      <Link href={`/event/${event.identifier}`} className="w-full">
        <Flex className="hover:border-grayA4 rounded-xl border-[1px] border-solid border-white/50 bg-white/50 p-3 pl-4 transition duration-200 ease-in-out hover:shadow-sm">
          <Flex justify="between" className="w-full" gap="4">
            <Flex direction="column" gap="2">
              <Flex align="center" gap="1">
                <Text color="gray" size="3" className="text-gray9">
                  {formatDate(new Date(event.timing.startDate), "HH:mm")}
                </Text>
              </Flex>
              <Heading size="5" color="gray" weight="medium" highContrast className="flex items-center tracking-tight leading-tighter gap-2">
                {event.title}
              </Heading>

              <Flex direction="column" gap="1">
                <Flex align="center" gap="2" mt="2px">
                  <Avatar fallback="95" size="1" radius="full" />
                  <Text color="gray" size="3" className="text-gray9 tracking-tight">
                    By 9-5 Events
                  </Text>
                </Flex>
                <Flex align="center" gap="2">
                  <Flex width="24px" justify="start">
                    <RiMapPin2Line color="gray" size="16" className="text-gray9" />
                  </Flex>
                  <Text color="gray" size="3" className="text-gray9 tracking-tight">
                    {event.location.name}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex>
              <Flex className="relative h-[120px] w-[120px]">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={event.imageUrl}
                    alt="image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </AspectRatio>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Flex>
  );
}
