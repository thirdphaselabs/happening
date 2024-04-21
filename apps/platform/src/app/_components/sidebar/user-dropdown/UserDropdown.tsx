"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, Button, ChevronDownIcon, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { Logout } from "./Logout";

export function UserDropdown() {
  const { user, isLoaded } = useUser();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray" className="hidden focus:outline-none md:flex">
          <Flex gap="2" align="center">
            <Avatar size="1" fallback="RJ" color="sky" />
            <Text
              size="2"
              color="gray"
              className={clsx("", !isLoaded && "bg-gray3 h-[15px] w-[45px] animate-pulse rounded-sm")}>
              {user?.firstName}
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
