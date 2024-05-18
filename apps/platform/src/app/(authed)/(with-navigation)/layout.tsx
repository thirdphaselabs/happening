import { currentUser } from "@clerk/nextjs";
import { Container } from "@radix-ui/themes";
import SidebarLayout from "~/app/_components/sidebar/SidebarLayout";
import { invariant } from "~/utils/helpers";

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  invariant(user, "User is not authenticated");

  return (
    <SidebarLayout user={user}>
      <Container size="4" p="5" className="flex-1 overflow-auto">
        {children}
      </Container>
    </SidebarLayout>
  );
}
