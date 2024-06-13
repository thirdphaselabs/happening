import { Container } from "@radix-ui/themes";
import { EventBuilderContextProvider } from "~/modules/event-management/create/context/event-builder.context";

export default function EventBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <EventBuilderContextProvider>
      <Container size="3">{children}</Container>
    </EventBuilderContextProvider>
  );
}
