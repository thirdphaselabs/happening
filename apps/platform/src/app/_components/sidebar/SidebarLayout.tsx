import { PlaventiSession } from "@plaventi/server/src/modules/auth/auth.controller";
import { Flex } from "@radix-ui/themes";
import { TopNavigation } from "../top-navbar/top-navigation";

export default function SidebarLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: PlaventiSession;
}) {
  return (
    <>
      <TopNavigation session={session} />
      <Flex direction="column" position="relative">
        {/* <Sidebar user={user} /> */}
        <Flex className="h-screen flex-1 pt-[20px]" overflow="visible">
          {children}
        </Flex>
      </Flex>
    </>
  );
}
