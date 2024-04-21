import { currentUser } from "@clerk/nextjs";
import { Separator, Card, Button } from "@plaventi/ui";
import { Flex, Heading, Badge, IconButton, ChevronDownIcon } from "@radix-ui/themes";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { NotificationCallout } from "../_components/Notification";
import { RecentEvents } from "../_components/RecentEvents";

export default async function Page() {
  const user = await currentUser();

  return (
    <Flex direction="column" gap="6">
      <Flex className="w-full" justify="between" align="center">
        <Heading>Welcome, {user?.firstName}</Heading>
        <Flex gap="4">
          <Button color="gray" variant="soft">
            Actions
            <ChevronDownIcon />
          </Button>
          <Button>
            Create event
          </Button>
        </Flex>
      </Flex>
      <Separator orientation="horizontal" />
      <RecentEvents />
    </Flex>
  );
}
