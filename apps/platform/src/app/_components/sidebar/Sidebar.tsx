import { User } from "@clerk/nextjs/dist/types/server";
import { Separator } from "@plaventi/ui";
import { Flex } from "@radix-ui/themes";
import { EventsManagerBadge } from "../EventsManagerBadge";
import CompanySection from "./CompanySection";
import NavigationItems from "./NavigationItems";
import ResponsiveSidebar from "./ResponsiveSidebar";

export default function Sidebar({ user }: { user: User }) {
  return (
    <ResponsiveSidebar>
      <Flex
        direction="column"
        justify="between"
        className="h-[calc(100vh-72px)] w-[256px] flex-shrink-0 pt-3 md:py-5">
        <Flex direction="column" gap="6">
          <Flex className="px-4 md:hidden">
            <EventsManagerBadge />
          </Flex>
          <Flex align="start" direction="column" gap="5">
            <NavigationItems />
          </Flex>
        </Flex>
        <Flex className="mb-2 w-full px-2">
          <CompanySection />
        </Flex>
      </Flex>
      <Separator orientation="vertical" />
    </ResponsiveSidebar>
  );
}
