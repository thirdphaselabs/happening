import { currentUser } from "@clerk/nextjs";
import { Button, Separator } from "@plaventi/ui";
import { ChevronDownIcon, Flex, Heading } from "@radix-ui/themes";

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
          <Button>Create event</Button>
        </Flex>
      </Flex>
      <Separator orientation="horizontal" />
      <RecentEvents />
    </Flex>
  );
}
