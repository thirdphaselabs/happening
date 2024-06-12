import { Container, Flex } from "@radix-ui/themes";
import { TopNavigation } from "../top-navbar/top-navigation";
import { getSession } from "~/app/actions";

export default async function SidebarLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });
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
