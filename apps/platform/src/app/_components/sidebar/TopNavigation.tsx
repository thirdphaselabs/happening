import { Separator } from "@plaventi/ui";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import navGraphic from "~/assets/nav.svg";
import { EventsManagerBadge } from "../EventsManagerBadge";
import { UserDropdown } from "./user-dropdown/UserDropdown";

export function TopNavigation() {
  return (
    <>
      <Flex position="relative" overflow="hidden" height="100%">
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
      </Flex>
      <Separator orientation="horizontal" className="w-full" />
    </>
  );
}
