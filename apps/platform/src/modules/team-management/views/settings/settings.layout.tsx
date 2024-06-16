"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { RiBankCard2Line, RiEditCircleLine, RiEqualizer2Line, RiImageEditLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "~/lib/utils";
import { useTeamManagement } from "../../context/team-management.context";

export function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { team } = useTeamManagement();

  const baseUrl = `/team/manage/${team.identifier}/settings`;

  return (
    <Flex width="100%" gap="8">
      <Flex direction="column" width="160px" gap="3">
        <Link href={`${baseUrl}/profile`} prefetch className="w-full">
          <Button
            variant="ghost"
            size="3"
            color="gray"
            className={cn("text-grayA9 w-full justify-start gap-3 font-medium", {
              "text-grayA12": pathname.includes("profile"),
            })}>
              <Flex>
            <RiImageEditLine size="18" />
            </Flex>
            Profile
          </Button>
        </Link>
        <Link href={`${baseUrl}/payment`} prefetch className="w-full">
          <Button
            variant="ghost"
            size="3"
            color="gray"
            className={cn("text-grayA9 w-full justify-start gap-3 font-medium", {
              "text-grayA12": pathname.includes("payment"),
            })}>
            <Flex>
              <RiBankCard2Line size="18" />
            </Flex>
            Payment
          </Button>
        </Link>
        <Link href={`${baseUrl}/options`} prefetch className="w-full">
          <Button
            variant="ghost"
            size="3"
            color="gray"
            className={cn("text-grayA9 w-full justify-start gap-3 font-medium", {
              "text-grayA12": pathname.includes("options"),
            })}>
            <Flex>
              <RiEqualizer2Line size="18" />
            </Flex>
            Options
          </Button>
        </Link>
      </Flex>
      <Flex width="100%">{children}</Flex>
    </Flex>
  );
}
