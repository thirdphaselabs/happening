import { UserContextProvider } from "~/modules/auth/user.context";
import { getSession } from "../actions";
import { serverClient } from "~/trpc/server";
import { MyEventsProvider } from "~/modules/event-management/events.context";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });
  const [events, attending] = await Promise.all([
    serverClient.event.all.query(),
    serverClient.profile.attending.query(),
  ]);

  return (
    <UserContextProvider session={session} attending={attending}>
      <MyEventsProvider events={events}>{children}</MyEventsProvider>
    </UserContextProvider>
  );
}
