"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import { Button } from "@plaventi/ui";
import Image from "next/image";
import logo from "~/assets/logo-only.png";
import { useBeginOnboarding } from "../_hooks/use-begin-onboarding";

export default function Onboarding() {
  const { beginOnboarding, isLoading } = useBeginOnboarding();

  return (
    <Flex direction="column" className="h-fit w-[480px] items-center gap-4 p-8 text-center">
      <Image src={logo} alt="Plaventi" width="80" height="80" />
      <Heading>Welcome to Plaventi</Heading>
      <Text size="2" color="gray">
        Organising events is hard, but it doesn't have to be. Plaventi is here to help you plan & manage events with your team.
      </Text>
      <Text size="2" color="gray">
        Let's set up your profile, organization and invite your team.
      </Text>
      <Button
        size="3"
        className="w-full"
        onClick={beginOnboarding}
        loading={{
          isLoading,
        }}>
        Get started
      </Button>
    </Flex>
  );
}
