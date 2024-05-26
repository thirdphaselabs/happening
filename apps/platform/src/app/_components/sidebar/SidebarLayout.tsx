import { Container, Flex } from "@radix-ui/themes";
import { TopNavigation } from "../top-navbar/TopNavigation";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavigation />
      <Flex direction="column" position="relative">
        {/* <Sidebar user={user} /> */}
        <Flex className="h-screen flex-1 overflow-auto pt-[20px]">{children}</Flex>
      </Flex>
    </>
  );
}
