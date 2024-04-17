import { Container, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { Badge } from "@plaventi/ui";
import Image from "next/image";
import reporting from "~/assets/reporting.png";

export function Features() {
  return (
    <Container className="w-full">
      <Flex gap="5" className="w-full py-[200px]" direction="column">
        <Flex direction="row" width="100%" className="gap-[120px]">
          <Flex direction="column" className="w-1/2 items-end">
            <Flex direction="column" className="max-w-[405px]">
              <Flex className="w-full">
                <Badge size="3" variant="outline">
                  Features
                </Badge>
              </Flex>
              <Heading className="max-w-[405px]" size="5">
                Discover why thousands of organizers chose Plaventi to create their event.
              </Heading>
              <Flex direction="column" className="mt-6 max-w-[391px] gap-6">
                <Flex direction="column" gap="5">
                  <Heading size="4" color="sky" className="opacity-50">
                    Event Planning
                  </Heading>
                  <Separator className="w-full opacity-[98%] " />
                </Flex>
                <Flex direction="column" gap="5">
                  <Heading size="4" color="sky" className="opacity-50">
                    Event Publishing
                  </Heading>
                  <Separator className="w-full opacity-[98%] " />
                </Flex>
                <Flex direction="column" gap="5">
                  <Heading size="4" color="sky" className="opacity-50">
                    Team Collaboration + Management
                  </Heading>
                  <Separator className="w-full opacity-[98%] " />
                </Flex>
                <Flex direction="column" gap="5">
                  <Heading size="4" color="sky" className="opacity-50">
                    Guest Management
                  </Heading>
                  <Separator className="w-full opacity-[98%] " />
                </Flex>
                <Flex direction="column" gap="5" position="relative">
                  <Flex direction="column" position="relative">
                    <Separator className="absolute h-full bg-sky-900" orientation="vertical" />
                    <Flex direction="column" gap="2" className="pl-8">
                      <Heading size="4" color="sky">
                        Reporting & Analytics
                      </Heading>
                      <Text size="3">
                        Gain valuable insights into your event's performance with comprehensive analytics to
                        optimize future planning and decision-making.
                      </Text>
                    </Flex>
                  </Flex>
                  <Separator className="w-full opacity-[98%] " />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="50%">
            <Image src={reporting} width={500} height={500} alt="Reporting and Analytics" />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
