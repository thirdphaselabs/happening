"use client";

import { Avatar, DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import { buildOrganizationFallbackInitials } from "~/lib/utils";
import { useUser } from "~/modules/auth/user.context";
import { Logout } from "./Logout";

export function UserDropdown() {
  const { session } = useUser();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" color="gray" className="hidden focus:outline-none md:flex">
          <Flex gap="2" align="center">
            <Avatar
              size="1"
              src={session.user.profilePictureUrl ?? undefined}
              fallback={buildOrganizationFallbackInitials({
                name: `${session.user.firstName} ${session.user.lastName}`,
              })}
              color="sky"
              radius="full"
            />
          </Flex>
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Account settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <Logout />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
