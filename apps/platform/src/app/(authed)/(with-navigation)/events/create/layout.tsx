import { Cross1Icon } from "@radix-ui/react-icons";
import { Container, Flex, Heading, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { EventBuilderNavigation } from "~/modules/events/builder/components/event-builder-navigation";
import { EventPreview } from "~/modules/events/builder/components/event-preview";
import { EventBuilderContextProvider } from "~/modules/events/create/context/event-builder.context";

export default function EventBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <EventBuilderContextProvider>
      <Container size="3">{children}</Container>
    </EventBuilderContextProvider>
  );
}
