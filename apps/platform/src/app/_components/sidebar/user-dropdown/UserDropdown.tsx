"use client";

import { Avatar, DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import { buildOrganizationFallbackInitials } from "~/lib/utils";
import { useUser } from "~/modules/auth/user.context";
import { Logout } from "./Logout";
import { UserAvatar } from "~/components/user-avatar";

export function UserDropdown() {
  const { user } = useUser();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" color="gray" className="hidden focus:outline-none md:flex">
          <Flex gap="2" align="center">
            <UserAvatar user={user} />
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
