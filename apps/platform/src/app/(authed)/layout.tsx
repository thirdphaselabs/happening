import { cookies } from "next/headers";
import { SyncActiveOrganization } from "../_components/sync-active-org";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SyncActiveOrganization activeOrgCookie={cookies().get("m-active-org")?.value} />
    </>
  );
}
