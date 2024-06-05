import { Cross1Icon } from "@radix-ui/react-icons";
import { Container, Flex, Heading, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { EventBuilderNavigation } from "~/modules/events/builder/components/event-builder-navigation";
import { EventPreview } from "~/modules/events/builder/components/event-preview";
import { EventBuilderContextProvider } from "~/modules/events/create/context/event-builder.context";

export default function EventBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <EventBuilderContextProvider>
      <Flex width="100%" direction="column">
        <Container size="4" height="100%" pt="6" px="6">
          <Flex width="100%" height="100%" justify="between">
            <Heading color="gray">Event Builder</Heading>
            <Link href="/">
              <IconButton variant="ghost" color="gray">
                <Cross1Icon />
              </IconButton>
            </Link>
          </Flex>
        </Container>
        <Container size="3" height="100%" px={{ initial: "4", md: "0" }} pt="8">
          <Flex width="100%" className="gap-[120px]">
            <Flex direction="column" width="50%" gap="6">
              {children}
            </Flex>
            <Flex width="50%">
              <EventPreview />
            </Flex>
          </Flex>
        </Container>
        <EventBuilderNavigation />
      </Flex>
    </EventBuilderContextProvider>
  );
}
