import { cookies } from "next/headers";
import { SyncActiveOrganization } from "../_components/sync-active-org";
import { UserContextProvider } from "~/modules/auth/user.context";
import { getSession } from "../actions";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });
  return (
    <UserContextProvider session={session}>
      {children}
      <SyncActiveOrganization activeOrgCookie={cookies().get("m-active-org")?.value} />
    </UserContextProvider>
  );
}
