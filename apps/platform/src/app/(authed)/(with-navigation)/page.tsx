import { Dashboard } from "~/modules/dashboard/dashboard";
import { getCurrentUser } from "~/trpc/utils/getUrl";

export default async function Page() {
  const user = await getCurrentUser();

  return <Dashboard user={user} />;
}
