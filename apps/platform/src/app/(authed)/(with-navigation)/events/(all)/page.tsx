import { Container } from "@radix-ui/themes";
import { Events } from "~/modules/events/all/events";

export default async function EventsPage() {
  return (
    <Container size="2">
      <Events />
    </Container>
  );
}
