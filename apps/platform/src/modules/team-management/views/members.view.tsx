"use client";

import { Flex, Heading } from "@radix-ui/themes";
import { EmptyState } from "~/components/empty-state";

export function ManageTeamMembers() {
  return (
    <Flex>
      <EmptyState
        title="Team Members Coming Soon"
        description="We're working on building out this page. Check back soon."
      />
    </Flex>
  );
}
