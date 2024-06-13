import { Flex } from "@radix-ui/themes";
import { EmptyState } from "~/components/empty-state";

export function EventDetailsChatView() {
  return (
    <Flex>
      <EmptyState
        title="Event Chat Coming Soon"
        description="We're working on building out this page. Check back soon."
      />
    </Flex>
  );
}
