import { Separator } from "@plaventi/ui";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import navGraphic from "~/assets/nav.svg";
import { EventsManagerBadge } from "../EventsManagerBadge";
import { UserDropdown } from "./user-dropdown/UserDropdown";

export function TopNavigation() {
  return (
    <>
      <Flex position="relative" top="0" className="z-10 h-[72px]">
        <Flex position="fixed" top="0" overflow="hidden" width="100%" className="bg-white">
          <Flex
            justify={{
              initial: "center",
              md: "between",
            }}
            width="100%"
            py="3"
            px="6"
            align="center">
            <Flex className="z-10 w-fit">
              <EventsManagerBadge />
            </Flex>
            <UserDropdown />
          </Flex>
          <Flex
            position="absolute"
            className="pointer-events-none bottom-[-18px] left-1/2 top-0 -translate-x-1/2 transform md:left-[130px]">
            <Image src={navGraphic} alt="Plaventi" height={80} />
          </Flex>
          <Separator orientation="horizontal" className="absolute bottom-0 z-50 w-full" />
        </Flex>
      </Flex>
    </>
  );
}
