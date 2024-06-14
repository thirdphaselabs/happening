import { Container, Flex } from "@radix-ui/themes";
import NavigationLayout from "~/app/_components/sidebar/SidebarLayout";
import { getSession } from "~/app/actions";

export async function EventDetailsLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  try {
    return (
      <NavigationLayout session={session} isFixed={false}>
        <Flex my="8" width="100%" overflow="visible">
          <Container size="3">{children}</Container>
        </Flex>
      </NavigationLayout>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}
