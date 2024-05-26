"use client";

import { Button, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { cn } from "~/lib/utils";
import useNavigation from "../sidebar/_hooks/useNavigation";
import { usePathname } from "next/navigation";

export default function NavigationItems() {
  const { activeRoute, navigationItems } = useNavigation();
  const pathName = usePathname();

  const isLargerContainer = pathName === "/events/create";

  return (
    <Container size={isLargerContainer ? "3" : "2"} align="center">
      <Flex align="center" gap="5" className="h-[24px]">
        {navigationItems.map((item) => {
          const isActive = activeRoute.route === item.route;
          return (
            <Link key={item.route} href={item.route} className="flex">
              <Button
                variant="ghost"
                color="gray"
                highContrast={isActive}
                className={cn(
                  "transition-default hover:text-gray12 gap-2 font-semibold tracking-tight hover:bg-transparent",
                )}>
                <item.icon height="16" width="16" />
                {item.title}
              </Button>
            </Link>
          );
        })}
      </Flex>
    </Container>
  );
}
