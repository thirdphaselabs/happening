import { Flex } from "@radix-ui/themes";
import Sidebar from "./Sidebar";
import { User } from "@clerk/nextjs/dist/types/server";
import { TopNavigation } from "./TopNavigation";

export default function SidebarLayout({ user, children }: { user: User; children: React.ReactNode }) {
  return (
    <Flex direction="column">
      <TopNavigation />
      <Flex>
        <Sidebar user={user} />
        <div className="h-screen flex-1 overflow-auto pt-[20px]">{children}</div>
      </Flex>
    </Flex>
  );
}
