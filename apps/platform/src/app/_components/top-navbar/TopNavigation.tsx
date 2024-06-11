import { Button } from "@plaventi/ui";
import { BellIcon, CalendarIcon, ChatBubbleIcon, Crosshair1Icon, GridIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Container,
  Flex,
  Popover,
  IconButton,
  Link,
  Text,
  Tooltip,
  Separator as RSeparator,
} from "@radix-ui/themes";
import { LogoOnlyBadge } from "../EventsManagerBadge";
import { UserDropdown } from "../sidebar/user-dropdown/UserDropdown";
import useNavigation from "../sidebar/_hooks/useNavigation";
import NavigationItems from "./NavigationItems";
import { Separator } from "./seperator";

const notificationItems = [
  {
    avatar: "FE",
    name: "Faye Emily",
    event: "Black Coffee All Night Long",
    message: "assigned you a task in",
    timeAgo: "2 hours ago",
  },
  {
    avatar: "DB",
    name: "Derik Beckham",
    event: "Jon & Sue's Baby Shower",
    message: "assigned you a task in",
    timeAgo: "1 day ago",
  },
  {
    avatar: "FE",
    name: "Faye Emily",
    event: "Black Coffee All Night Long",
    message: "changed the location of",
    timeAgo: "4 days ago",
  },
];

const messages = [
  {
    avatar: "JJ",
    name: "Jon James",
    event: null,
    message: "Hello sir, just added you back as an admin to the event. Make your changes 👊",
    timeAgo: "2 hours ago",
  },
  {
    avatar: "DB",
    name: "Derik Beckham",
    event: "Jon & Sue's Baby Shower",
    message:
      "Hey team, I've added a new task for everyone. Please check it out and let me know if you have any questions.",
    timeAgo: "1 day ago",
  },
  {
    avatar: "FE",
    name: "Faye Emily",
    event: "Black Coffee All Night Long",
    message: "Should we update the event timings based on the new law in Ibiza? Let me know your thoughts.",
    timeAgo: "4 days ago",
  },
];

export function TopNavigation() {
  return (
    <>
      <Flex position="relative" top="0" className="z-[99999999] h-fit">
        <Flex
          position="fixed"
          top="0"
          overflow="hidden"
          width="100%"
          className="bg-transparent"
          style={{ backdropFilter: "blur(16px)" }}>
          <Flex
            justify={{
              initial: "center",
              md: "center",
            }}
            width="100%"
            py="3"
            px="6"
            align="center">
            <Flex className="absolute z-10 w-fit" left="6">
              {/* <EventsManagerBadge /> */}
              <LogoOnlyBadge />
            </Flex>
            <NavigationItems />
            <Flex gap="4" align="center" position="absolute" right="6">
              <Text color="gray" size="2" className="text-gray8">
                9-5 Events
              </Text>
              <Link
                size="2"
                color="gray"
                href={"/events/create"}
                underline="none"
                className="transition-default text-gray11 hover:text-gray12 font-medium tracking-tight">
                Create Event
              </Link>
              <Popover.Root>
                <Popover.Trigger>
                  <IconButton
                    variant="ghost"
                    color="gray"
                    size="2"
                    className="transition-default text-gray8 hover:bg-transparent hover:text-gray-900">
                    <ChatBubbleIcon height="17" width="17" />
                  </IconButton>
                </Popover.Trigger>
                <Popover.Content align="end" width="350px" minHeight="200px" className="p-0">
                  {messages.map((item) => (
                    <>
                      <Button
                        color="gray"
                        variant="surface"
                        size="4"
                        className="hover:bg-grayA3 h-fit w-full justify-start gap-4 rounded-none px-4 py-4 shadow-none">
                        <Avatar fallback={item.avatar} size="1" radius="full" />
                        <Flex direction="column" align="start">
                          <Text size="2" weight="medium" highContrast align="left">
                            {item.name}
                          </Text>

                          <Text size="2" weight="medium" align="left">
                            {item.event}
                          </Text>
                          <Text size="2" color="gray" weight="light" align="left" className="message-text">
                            {item.message}
                          </Text>
                        </Flex>
                      </Button>
                      <RSeparator orientation="horizontal" className="w-full" />
                    </>
                  ))}
                </Popover.Content>
              </Popover.Root>

              <Popover.Root>
                <Popover.Trigger>
                  <IconButton
                    variant="ghost"
                    color="gray"
                    size="2"
                    className="transition-default text-gray8 hover:bg-transparent hover:text-gray-900 ">
                    <BellIcon height="17" width="17" />
                  </IconButton>
                </Popover.Trigger>
                <Popover.Content align="end" width="350px" minHeight="200px" className="p-0">
                  {notificationItems.map((item) => (
                    <>
                      <Button
                        color="gray"
                        variant="surface"
                        size="4"
                        className="hover:bg-grayA3 h-fit w-full justify-between gap-4 rounded-none px-4 py-4 shadow-none">
                        <Avatar fallback={item.avatar} size="1" radius="full" />
                        <Text size="2" align="left" weight="regular" highContrast>
                          <Text size="2" weight="medium" highContrast>
                            {item.name}
                          </Text>{" "}
                          {item.message}{" "}
                          <Text size="2" weight="medium" highContrast>
                            {item.event}
                          </Text>{" "}
                          <Text size="2" weight="light" color="gray">
                            {item.timeAgo}
                          </Text>
                        </Text>
                      </Button>
                      <RSeparator orientation="horizontal" className="w-full" />
                    </>
                  ))}
                </Popover.Content>
              </Popover.Root>
              <UserDropdown />
            </Flex>
          </Flex>
          {/* <Flex
            position="absolute"
            className="pointer-events-none bottom-[-18px] left-1/2 top-0 -translate-x-1/2 transform md:left-[130px]">
            <Image src={navGraphic} alt="Plaventi" height={80} />
          </Flex> */}
          <Separator />
        </Flex>
      </Flex>
    </>
  );
}
