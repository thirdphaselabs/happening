import { auth, currentUser, useUser } from "@clerk/nextjs";
import { Avatar, Button, ChevronDownIcon, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { getCurrentUser } from "~/trpc/utils/getUrl";
import { Logout } from "./Logout";

export async function UserDropdown() {
  const user = await getCurrentUser();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray" className="focus:outline-none hidden md:flex">
          <Flex gap="2" align="center">
            <Avatar size="1" fallback="RJ" color="sky" />
            <Text size="2" color="gray">
              {user.firstName}
            </Text>
            <ChevronDownIcon />
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Account settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <Logout />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
