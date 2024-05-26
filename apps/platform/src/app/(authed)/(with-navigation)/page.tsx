import { Container } from "@radix-ui/themes";
import { Dashboard } from "~/modules/dashboard/dashboard";
import { getCurrentUser } from "~/trpc/utils/getUrl";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <Container size="2">
      <Dashboard user={user} />
    </Container>
  );
}
