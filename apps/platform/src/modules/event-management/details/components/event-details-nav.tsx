"use client";

import { Container, Flex, Separator, TabNav } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

export function EventDetailsNav({ identifier }: { identifier: string }) {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <Flex direction="column">
      <Container size="2">
        <TabNav.Root size="2" className="gap-2" color="gray" highContrast>
          <TabNav.Link
            asChild
            active={pathname === `/events/${identifier}/overview`}
            className="px-0 text-[16px]">
            <NextLink href={`/events/${identifier}/overview`}>Overview</NextLink>
          </TabNav.Link>
          <TabNav.Link
            asChild
            active={pathname === `/events/${identifier}/guests`}
            className="px-0 text-[16px]">
            <NextLink href={`/events/${identifier}/guests`}>Guests</NextLink>
          </TabNav.Link>
          <TabNav.Link
            asChild
            active={pathname === `/events/${identifier}/registration`}
            className="px-0 text-[16px]">
            <NextLink href={`/events/${identifier}/registration`}>Registration</NextLink>
          </TabNav.Link>
          <TabNav.Link
            asChild
            active={pathname === `/events/${identifier}/insights`}
            className="px-0 text-[16px]">
            <NextLink href={`/events/${identifier}/insights`}>Insights</NextLink>
          </TabNav.Link>
          <TabNav.Link
            asChild
            active={pathname === `/events/${identifier}/chat`}
            className="px-0 text-[16px]">
            <NextLink href={`/events/${identifier}/chat`}>Chat</NextLink>
          </TabNav.Link>
        </TabNav.Root>
      </Container>
      <Separator orientation="horizontal" className="bg-grayA3 w-full" />
    </Flex>
  );
}
