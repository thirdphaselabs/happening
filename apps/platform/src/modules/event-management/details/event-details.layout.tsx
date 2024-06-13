import { Button } from "@plaventi/ui";
import { ArrowTopRightIcon, CaretRightIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Box, Container, Flex, Heading, IconButton, Link, Tooltip } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { serverClient } from "~/trpc/server";
import { PageParams } from "~/trpc/types";
import { isString } from "~/utils/helpers";
import { EventDetailsNav } from "./components/event-details-nav";
import { EventDetailsContextProvider } from "./context/event-details.context";

export async function EventDetailsLayout({
  children,
  params: { identifier },
}: PageParams<"identifier"> & { children: React.ReactNode }) {
  if (!identifier || !isString(identifier)) return notFound();
  const event = await serverClient.event.byIdentifier.query({ identifier });

  if (!event) {
    return notFound();
  }

  const pathname: string = "/account";

  return (
    <EventDetailsContextProvider event={event}>
      <Flex direction="column" gap="3" mt="4" mb="6" className="w-full">
        <Container size="2">
          <Link size="2" color="gray" className="flex items-center gap-1 font-medium" mb="2" href="/events">
            9-5 Events
            <CaretRightIcon />
          </Link>
          <Flex className="w-full" justify="between" align="center" gap="6">
            <Heading size="8" className="items-center">
              <Tooltip content="This event is public and available in discovery." side="top" align="center">
                <IconButton size="1" color="sky" variant="soft" mt="2" mr="2">
                  <GlobeIcon />
                </IconButton>
              </Tooltip>
              {event.title}
            </Heading>
            <Flex>
              <Link href={`/event/${event.identifier}`}>
                <Button color="gray" variant="soft" className="text-nowrap no-underline">
                  <ArrowTopRightIcon />
                  Event page
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
        <Flex direction="column" className="w-full" gap="6">
          <EventDetailsNav identifier={identifier} />

          <Container size="2">
            <Box>{children}</Box>
          </Container>
        </Flex>
      </Flex>
    </EventDetailsContextProvider>
  );
}
