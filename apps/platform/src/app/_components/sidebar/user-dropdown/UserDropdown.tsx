"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, Button, ChevronDownIcon, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { Logout } from "./Logout";

export function UserDropdown() {
  const { user, isLoaded } = useUser();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" color="gray" className="hidden focus:outline-none md:flex">
          <Flex gap="2" align="center">
            <Avatar size="1" fallback="RJ" color="sky" radius="full" />
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
