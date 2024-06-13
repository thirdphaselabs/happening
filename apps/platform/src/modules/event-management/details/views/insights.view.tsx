import { Flex } from "@radix-ui/themes";
import { EmptyState } from "~/components/empty-state";

export function EventDetailsInsightsView() {
  return (
    <Flex>
      <EmptyState
        title="Event Insights Coming Soon"
        description="We're working on building out this page. Check back soon."
      />
    </Flex>
  );
}
