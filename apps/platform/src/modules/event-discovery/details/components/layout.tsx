import { Container, Flex } from "@radix-ui/themes";
import SidebarLayout from "~/app/_components/sidebar/SidebarLayout";
import { getSession } from "~/app/actions";

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });
  try {
    return (
      <SidebarLayout session={session}>
        <Flex mt="8" width="100%" overflow="visible">
          {children}
        </Flex>
      </SidebarLayout>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}
