import { User } from "@clerk/nextjs/dist/types/server";
import { Flex } from "@radix-ui/themes";
import { EventsManagerBadge } from "../EventsManagerBadge";
import CompanySection from "./CompanySection";
import ResponsiveSidebar from "./ResponsiveSidebar";
import NavigationItems from "./NavigationItems";
import UserSection from "./UserSection";
import { Separator } from "@plaventi/ui";

export default function Sidebar({ user }: { user: User }) {
  const userShort = {
    name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
    role: "MANAGER" as const,
    image: user.hasImage ? user.imageUrl : null,
  };

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
