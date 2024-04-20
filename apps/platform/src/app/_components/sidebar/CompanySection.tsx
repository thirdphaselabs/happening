"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { buildOrganizationFallbackInitials } from "~/lib/utils";
import { Logout } from "./user-dropdown/Logout";

export default function CompanySection() {
  const { organization } = useOrganization();
  const { userMemberships, isLoaded, setActive } = useOrganizationList({ userMemberships: true });
  const router = useRouter();

  if (!isLoaded)
    return (
      <Flex justify="between" align="center" px="2" py="1" className="hover:bg-jadeA3 w-full">
        <Flex gap="2" align="center">
          <Avatar size="1" fallback="" />
          <Flex direction="column">
            <div className="bg-jadeA3 mt-1 h-4 w-14 animate-pulse" />
            <Text size="1" className="text-neutral-400">
              Company
            </Text>
          </Flex>
        </Flex>
        <Button size="1" className="bg-transparent" variant="solid">
          <DotsVerticalIcon />
        </Button>
      </Flex>
    );
  if (!organization || !setActive) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          className="hover:bg-jadeA3 w-full items-center justify-center bg-transparent py-5 shadow-none"
          variant="outline"
          color="gray">
          <Flex gap="2" align="center" className="w-full">
            <Avatar
              size="1"
              fallback={buildOrganizationFallbackInitials(organization)}
              src={organization.hasImage ? organization.imageUrl : undefined}
            />
            <Flex direction="column" align="start">
              <Text size="2">{organization.name}</Text>
              <Text size="1" className="text-neutral-400">
                Team
              </Text>
            </Flex>
          </Flex>
          <DotsVerticalIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Team settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <PersonIcon />
          Invite & manage members
        </DropdownMenu.Item>
        <Logout />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
