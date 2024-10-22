import { Button } from "@plaventi/ui";
import { ArrowRightIcon, GlobeIcon, PersonIcon, SewingPinIcon, SlashIcon } from "@radix-ui/react-icons";
import { AspectRatio, Flex, Heading, IconButton, Skeleton, Text, Tooltip } from "@radix-ui/themes";
import { User } from "@workos-inc/node";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "~/components/user-avatar";
import { useUser } from "~/modules/auth/user.context";
import { PlaventiEvent } from "~/trpc/types";

export function EventManageCard({ event, index }: { event: PlaventiEvent; index: number }) {
  const { fakeUserOne, fakeUserTwo } = useUser();

  const user = index !== 0 ? fakeUserOne : fakeUserTwo;

  return (
    <Flex className="md:w-full">
      <Link href={`/events/${event.identifier}/overview`} className="w-full">
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
                className="flex items-center gap-2 leading-tight tracking-tight">
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
                    {event.location.name}
                  </Text>
                </Flex>
                <Flex align="center" gap="1">
                  <Flex width="20px">
                    <PersonIcon color="gray" height="16" width="16" className="text-gray9" />
                  </Flex>
                  {/* <Text color="gray" size="3" className="text-gray9 tracking-tight">
                    No guests
                  </Text> */}
                  <Flex gap="2">
                    <Flex align="center">
                      <UserAvatar
                        user={
                          {
                            firstName: user?.[0].name.split(" ")[0],
                            lastName: user?.[0].name.split(" ").slice(1).join(" "),
                          } as User
                        }
                        color={user?.[0].color}
                      />
                      <Flex style={{ marginLeft: "-4px", zIndex: 1 }}>
                        <UserAvatar
                          user={
                            {
                              firstName: user?.[1].name.split(" ")[0],
                              lastName: user?.[1].name.split(" ").slice(1).join(" "),
                            } as User
                          }
                          color={user?.[1].color}
                        />
                      </Flex>
                      <Flex style={{ marginLeft: "-4px", zIndex: 2 }}>
                        <UserAvatar
                          user={
                            {
                              firstName: user?.[2].name.split(" ")[0],
                              lastName: user?.[2].name.split(" ").slice(1).join(" "),
                            } as User
                          }
                          color={user?.[2].color}
                        />
                      </Flex>
                    </Flex>
                    <Skeleton loading={!user}>
                      <Text color="gray" size="3" className="text-gray9 tracking-tight">
                        {user?.length} guests
                      </Text>
                    </Skeleton>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Button variant="soft" color="gray" mt="1">
                  Manage Event
                  <ArrowRightIcon />
                </Button>
              </Flex>
            </Flex>
            <Flex>
              <Flex className="relative h-[90px] w-[90px] md:h-[120px] md:w-[120px]">
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
