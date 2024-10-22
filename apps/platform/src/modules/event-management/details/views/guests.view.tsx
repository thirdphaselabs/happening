"use client";

import { Button } from "@plaventi/ui";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  Cross2Icon,
  DownloadIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Badge, Box, Flex, Heading, IconButton, Separator, Text, TextField, Tooltip } from "@radix-ui/themes";
import { ProgressBar } from "@tremor/react";
import { formatDate } from "date-fns";
import Link from "next/link";
import { UserAvatar } from "~/components/user-avatar";
import { useUser } from "~/modules/auth/user.context";

import { RiGroupLine, RiMailSendLine, RiQrScan2Line, RiUserUnfollowLine } from "@remixicon/react";
import { useEventDetails } from "../context/event-details.context";
import { useMemo, useState } from "react";
import { cn } from "~/lib/utils";

export function EventDetailsGuestsView() {
  const { event } = useEventDetails();
  const { user, fakeUserOne, updateFakeUserStatus } = useUser();
  const [search, setSearch] = useState<string | null>(null);

  const filteredFakeUserOne = useMemo(() => {
    if (!search) return fakeUserOne;
    return fakeUserOne
      .filter((user) => {
        if (!search) return true;
        return user.name.toLowerCase().includes(search.toLowerCase());
      })
      .slice(0, 15);
  }, [fakeUserOne, search]);

  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="5">
          <Heading size="5">Guest Overview</Heading>
          <Flex direction="column" gap="3">
            <Flex width="100%" justify="between">
              <Flex align="end" gap="1">
                <Text size="6" weight="medium" color="green">
                  {fakeUserOne.length}
                </Text>
                <Text size="3" color="green">
                  guests
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
                  {fakeUserOne.filter((user) => user.status === "approved").length} Going
                </Text>
              </Flex>
              <Flex
                align="center"
                gap="2"
                className={cn(
                  fakeUserOne.filter((user) => user.status === "pending").length > 0 ? "" : "hidden",
                )}>
                <Box className="bg-orangeA8 rounded-full p-1" />
                <Text size="2" color="orange">
                  {fakeUserOne.filter((user) => user.status === "pending").length} Pending Approval
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box className="bg-redA8 rounded-full p-1" />
                <Text size="2" color="red">
                  {fakeUserOne.filter((user) => user.status === "rejected").length} Declined
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
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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
            {filteredFakeUserOne.map(({ name, email, status, color, image }, index) => (
              <>
                <Flex width="100%" justify="between" className="px-3">
                  <Flex align="center" gap="3">
                    <UserAvatar
                      image={image}
                      user={{
                        ...user,
                        firstName: name.split(" ")[0],
                        lastName: name.split(" ").slice(1).join(" "),
                      }}
                      color={color}
                    />
                    <Flex align="center" gap="2">
                      <Text size="3" weight="medium">
                        {name}
                      </Text>
                      <Text color="gray" size="3">
                        {email}
                      </Text>
                    </Flex>
                  </Flex>
                  {status === "pending" ? (
                    <Flex align="center" gap="3">
                      <Button
                        variant="ghost"
                        color="green"
                        onClick={() => updateFakeUserStatus("one", email, "approved")}>
                        <CheckIcon />
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        color="red"
                        onClick={() => updateFakeUserStatus("one", email, "rejected")}>
                        <Cross2Icon />
                        Decline
                      </Button>
                      <Text size="2" color="gray">
                        {formatDate(new Date(), "d MMM")}
                      </Text>
                    </Flex>
                  ) : (
                    <Flex align="center" gap="3">
                      <Badge color={status === "approved" ? "green" : "red"} size="2" radius="full">
                        {status === "approved" ? "Going" : "Declined"}
                      </Badge>
                      <Text size="2" color="gray">
                        {formatDate(new Date(), "d MMM")}
                      </Text>
                    </Flex>
                  )}
                </Flex>
                {filteredFakeUserOne.length - 1 !== index && (
                  <Separator orientation="horizontal" className="bg-grayA3 w-full" />
                )}
              </>
            ))}
            {filteredFakeUserOne.length === 0 && (
              <Flex direction="column" gap="4" align="center" className="py-6">
                <Flex
                  className="rounded-lg p-2"
                  style={{
                    backgroundColor: "var(--gray-a4)",
                  }}>
                  <RiUserUnfollowLine
                    xHeight="16"
                    style={{
                      color: "var(--sky-a11)",
                    }}
                  />
                </Flex>
                <Flex direction="column" gap="1" align="center">
                  <Heading size="3" color="gray">
                    No guests found
                  </Heading>
                  <Text size="3" color="gray">
                    Please try a different search.
                  </Text>
                </Flex>
              </Flex>
            )}
          </Flex>
          <Flex justify="end" gap="2" className={cn(filteredFakeUserOne.length < 15 && "hidden")}>
            <IconButton variant="soft" color="gray" size="2">
              <ArrowLeftIcon />
            </IconButton>
            <IconButton variant="soft" color="gray" size="2">
              <ArrowRightIcon />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
