import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { RiMap2Line } from "@remixicon/react";
import { EventsNearMe } from "./components/events-near-me";
import { MapComp, MapOfCity } from "../events/create/components/map";
import { serverClient } from "~/trpc/server";

export async function Discovery() {
  const events = await serverClient.eventDiscovery.allForCity.query();
  return (
    <Container size="2" overflow="visible">
      <Flex direction="column" gap="6" my="6" overflow="visible">
        <Box className="w-full" position="relative" overflow="visible">
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Heading size="5" className="flex items-center gap-1" color="gray">
                What's Happening Near
              </Heading>
              <Heading size="9" className="flex items-center gap-1">
                Manchester, UK
              </Heading>
            </Flex>
            <Text size="3" color="gray" className="max-w-xl">
              Manchester's event scene blends creativity and practicality, offering diverse workshops and
              meetups for a dynamic experience of growth and inspiration.
            </Text>
            <Flex gap="2">
              <Button variant="soft" color="gray">
                <RiMap2Line size="15" />
                Change location
              </Button>
              <IconButton variant="soft" color="gray" size="2">
                <MagnifyingGlassIcon height="17" width="17" />
              </IconButton>
            </Flex>
          </Flex>

          <Flex width="100%" gap="8" overflow="visible">
            <Flex gap="4" mt="9" width="2/3" className="w-fit">
              <EventsNearMe events={events} />
            </Flex>
            <Flex
              direction="column"
              gap="4"
              mt="9"
              width="280px"
              minWidth="280px"
              className="h-fit"
              position="sticky"
              style={{
                position: "-webkit-sticky",
                top: "70px",
              }}
              top="0">
              <Flex direction="column" gap="2">
                <Flex className="bg-skyA3 h-[50px] w-[50px] items-center justify-center rounded-full">
                  <Text size="7" className="text-[30px]">
                    🇬🇧
                  </Text>
                </Flex>
                <Heading size="4">Manchester</Heading>
              </Flex>
              <Text size="2" color="gray">
                Discover the best events in Manchester, and get notified of new events before they sell out.
              </Text>
              <MapOfCity city="Manchester United Kingdom" />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}
