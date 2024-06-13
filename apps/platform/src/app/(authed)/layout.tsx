import { UserContextProvider } from "~/modules/auth/user.context";
import { getSession } from "../actions";
import { serverClient } from "~/trpc/server";
import { MyEventsProvider } from "~/modules/event-management/events.context";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });
  const events = await serverClient.event.all.query();

  return (
    <UserContextProvider session={session}>
      <MyEventsProvider events={events}>{children}</MyEventsProvider>
    </UserContextProvider>
  );
}
