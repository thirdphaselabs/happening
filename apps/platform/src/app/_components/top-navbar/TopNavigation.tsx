import { Button, Separator } from "@plaventi/ui";
import { BellIcon, CalendarIcon, ChatBubbleIcon, Crosshair1Icon, GridIcon } from "@radix-ui/react-icons";
import { Container, Flex, IconButton, Link, Text, Tooltip } from "@radix-ui/themes";
import { LogoOnlyBadge } from "../EventsManagerBadge";
import { UserDropdown } from "../sidebar/user-dropdown/UserDropdown";
import useNavigation from "../sidebar/_hooks/useNavigation";
import NavigationItems from "./NavigationItems";

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
              <Tooltip content="Chat" side="bottom" align="center" delayDuration={200}>
                <IconButton
                  variant="ghost"
                  color="gray"
                  size="2"
                  className="transition-default text-gray8 hover:bg-transparent hover:text-gray-900">
                  <ChatBubbleIcon height="17" width="17" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Notifications" side="bottom" align="center" delayDuration={200}>
                <IconButton
                  variant="ghost"
                  color="gray"
                  size="2"
                  className="transition-default text-gray8 hover:bg-transparent hover:text-gray-900 ">
                  <BellIcon height="17" width="17" />
                </IconButton>
              </Tooltip>
              <UserDropdown />
            </Flex>
          </Flex>
          {/* <Flex
            position="absolute"
            className="pointer-events-none bottom-[-18px] left-1/2 top-0 -translate-x-1/2 transform md:left-[130px]">
            <Image src={navGraphic} alt="Plaventi" height={80} />
          </Flex> */}
          <Separator orientation="horizontal" className="absolute bottom-0 z-50 w-full" />
        </Flex>
      </Flex>
    </>
  );
}
