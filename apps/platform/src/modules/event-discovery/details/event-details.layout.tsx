import { Container, Flex } from "@radix-ui/themes";
import SidebarLayout from "~/app/_components/sidebar/SidebarLayout";
import { getSession } from "~/app/actions";

export async function EventDetailsLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  try {
    return (
      <SidebarLayout session={session}>
        <Flex mt="8" width="100%" overflow="visible">
          <Container size="3">{children}</Container>
        </Flex>
      </SidebarLayout>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}
