import { Container, Flex } from "@radix-ui/themes";
import NavigationLayout from "~/app/_components/sidebar/SidebarLayout";
import { getSession } from "~/app/actions";

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });
  try {
    return (
      <NavigationLayout session={session}>
        <Flex mt="8" width="100%" overflow="visible">
          {children}
        </Flex>
      </NavigationLayout>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}
