"use client";

import { useClerk } from "@clerk/nextjs";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Avatar, Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { buildOrganizationFallbackInitials } from "~/lib/utils";
import { Role } from "~/trpc/types";

export default function UserSection({ user }: { user: { name: string; role: Role; image: string | null } }) {
  const { signOut } = useClerk();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button className="hover:bg-jadeA3 w-full  items-center justify-center bg-transparent py-5">
          <Flex gap="2" align="center" className="w-full">
            <Avatar
              size="1"
              fallback={buildOrganizationFallbackInitials(user)}
              src={user.image ?? undefined}
            />
            <Flex direction="column" align="start">
              <Text className="text-white" size="2">
                {user.name}
              </Text>
              <Text size="1" className="capitalize text-neutral-400">
                {user.role.toLowerCase()}
              </Text>
            </Flex>
          </Flex>
          <DotsVerticalIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-[200px]">
        <DropdownMenu.Item color="red" onClick={() => signOut()}>
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
