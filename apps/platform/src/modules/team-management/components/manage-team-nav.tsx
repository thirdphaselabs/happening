"use client";

import { Container, Flex, Separator, TabNav } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

export function ManageTeamNav({ identifier }: { identifier: string }) {
  const pathname = usePathname();

  return (
    <Flex direction="column">
      <Container size="2">
        <TabNav.Root size="2" className="gap-2" color="gray" highContrast>
          <TabNav.Link
            asChild
            active={pathname === `/team/manage/${identifier}/events`}
            className="px-0 text-[16px]">
            <NextLink href={`/team/manage/${identifier}/events`} prefetch>
              Events
            </NextLink>
          </TabNav.Link>
          <TabNav.Link
            asChild
            active={pathname === `/team/manage/${identifier}/members`}
            className="px-0 text-[16px]">
            <NextLink href={`/team/manage/${identifier}/members`} prefetch>
              Members
            </NextLink>
          </TabNav.Link>
          <TabNav.Link
            asChild
            active={pathname.startsWith(`/team/manage/${identifier}/settings`)}
            className="px-0 text-[16px]">
            <NextLink href={`/team/manage/${identifier}/settings/profile`} prefetch>
              Settings
            </NextLink>
          </TabNav.Link>
        </TabNav.Root>
      </Container>
      <Separator orientation="horizontal" className="bg-grayA3 w-full" />
    </Flex>
  );
}
