import { Container, Flex } from "@radix-ui/themes";
import SidebarLayout from "~/app/_components/sidebar/SidebarLayout";

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  try {
    return (
      <SidebarLayout>
        <Flex mt="8" width="100%">
          {children}
        </Flex>
      </SidebarLayout>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}
