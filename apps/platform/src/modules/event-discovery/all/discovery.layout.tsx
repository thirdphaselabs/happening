import { Flex, Text, Heading } from "@radix-ui/themes";
import { ReactNode } from "react";
import Image from "next/image";
import discover from "~/assets/discover.png";
import { TopNavigation } from "~/app/_components/top-navbar/top-navigation";
import { getSession } from "~/app/actions";

export async function DiscoveryLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <Flex direction="column" gap="6">
      <TopNavigation session={session} />

      <Flex direction="column" className="w-full" justify="between" gap="4">
        {children}
      </Flex>
    </Flex>
  );
}
