import { AspectRatio, Avatar, Badge, Flex, Heading, Text } from "@radix-ui/themes";
import { RiMapPin2Line } from "@remixicon/react";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
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
              <Heading
                size="5"
                color="gray"
                weight="medium"
                highContrast
                className="leading-tighter flex items-center gap-2 tracking-tight">
                {event.title}
              </Heading>

              <Flex direction="column" gap="1">
                <Flex align="center" gap="2" mt="2px">
                  <Flex width="24px" justify="start">
                    <Avatar fallback="95" size="1" radius="full" className="h-[18px] w-[18px] text-[10px]" />
                  </Flex>
                  <Text color="gray" size="3" className="text-gray9 tracking-tight">
                    By {event.host.name}
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
              <Flex mt="2">
                {event.ticketing.types[0].price ? (
                  <Badge color="green" size="2">
                    US{new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    }).format(event.ticketing.types[0].price)}
                  </Badge>
                ): <Badge color="amber">Limited Availability</Badge>}
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
