"use client";

import { DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import { UserAvatar } from "~/components/user-avatar";
import { useOptionalUser } from "~/modules/auth/user.context";
import { Logout } from "./Logout";

export function UserDropdown() {
  const user = useOptionalUser();
  if (!user) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" color="gray" className=" focus:outline-none">
          <Flex gap="2" align="center">
            <UserAvatar user={user.user} />
          </Flex>
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item color="gray">Account settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <Logout />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
