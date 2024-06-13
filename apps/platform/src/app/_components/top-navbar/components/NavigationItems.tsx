"use client";

import { Button, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import useNavigation from "../../sidebar/_hooks/useNavigation";

export default function NavigationItems() {
  const { activeRoute, navigationItems } = useNavigation();
  const pathName = usePathname();

  const isLargerContainer = pathName === "/events/create" || !activeRoute;

  return (
    <Container size={isLargerContainer ? "3" : "2"} align="center">
      <Flex align="center" gap="5" className="h-[24px]">
        {navigationItems.map((item) => {
          const isActive = activeRoute?.route === item.route;
          return (
            <Link key={item.route} href={item.route} className="flex w-fit">
              <Button
                variant="ghost"
                color="gray"
                highContrast={isActive}
                className={cn(
                  "transition-default text-gray10 hover:text-gray12 m-0 w-fit gap-[6px] p-0 font-[500] transition duration-300 ease-in-out hover:bg-transparent",
                  { "text-gray12": isActive },
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
