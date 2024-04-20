import { currentUser } from "@clerk/nextjs";
import { Container } from "@radix-ui/themes";
import { invariant } from "~/utils/helpers";
import SidebarLayout from "../_components/sidebar/SidebarLayout";
import { SyncActiveOrganization } from "../_components/sync-active-org";
import { cookies } from "next/headers";

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  invariant(user, "User is not authenticated");

  return (
    <SidebarLayout user={user}>
      <Container size="3" p="5" className="h-screen flex-1 overflow-auto">
        {children}
      </Container>
      <SyncActiveOrganization activeOrgCookie={cookies().get("m-active-org")?.value} />
    </SidebarLayout>
  );
}
