import { Flex } from "@radix-ui/themes";
import { EmptyState } from "~/components/empty-state";

export function EventDetailsRegistrationView() {
  return (
    <Flex>
      <EmptyState
        title="Registration Information Coming Soon"
        description="We're working on building out this page. Check back soon."
      />
    </Flex>
  );
}
