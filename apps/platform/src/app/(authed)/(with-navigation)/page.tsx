import { Container } from "@radix-ui/themes";
import { getSession } from "~/app/actions";
import { Dashboard } from "~/modules/dashboard/dashboard";

export default async function Page() {
  const user = await getSession({ ensureSignedIn: true });

  return (
    <Container size="2">
      <Dashboard user={user.user} />
    </Container>
  );
}
