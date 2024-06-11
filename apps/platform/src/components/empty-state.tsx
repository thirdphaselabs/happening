"use client";

import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function EmptyState({ title, description }: { title: string; description: string }) {
  const router = useRouter();
  return (
    <Flex direction="column" gap="6" width="100%" align="center" py="5">
      <Flex direction="column" gap="3" align="center">
        <Heading size="6" color="gray">
          {title}
        </Heading>
        <Text size="3" color="gray">
          {description}
        </Text>
      </Flex>
      <Button
        color="gray"
        variant="soft"
        onClick={() => {
          // navigate back
          router.back();
        }}>
        <ArrowLeftIcon />
        Go Back
      </Button>
    </Flex>
  );
}
