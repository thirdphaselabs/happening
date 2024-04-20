import { Flex, Heading, Text } from "@radix-ui/themes";
import { ReactNode } from "react";
import { EventsManagerBadge } from "~/app/_components/EventsManagerBadge";

export function OnboardingSectionHeader({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Flex direction="column" align="center" width="100%" gap="6">
      <Flex align="center" justify="center" mb="4">
        <EventsManagerBadge />
      </Flex>
      <Flex direction="column" gap="2" align="center">
        <Heading size="7" mb="0">
          {title}
        </Heading>
        <Text size="2" color="gray" weight="light">
          {description}
        </Text>
      </Flex>
      {children}
    </Flex>
  );
}
