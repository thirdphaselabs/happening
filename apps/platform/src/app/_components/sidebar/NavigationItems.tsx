"use client";

import { Button, Flex, Badge } from "@radix-ui/themes";
import Link from "next/link";
import { NavigationItem, Route } from "~/types/types";
import useNavigation from "./_hooks/useNavigation";
import clsx from "clsx";
import { ReactNode } from "react";

export default function NavigationItems() {
  const { activeRoute, navigationItems } = useNavigation();

  return (
    <Flex direction="column" px="4" gap="2" className="w-full">
      {navigationItems.map((item) => {
        const isActive = activeRoute.route === item.route;
        const context = item.route === Route.Messages ? <Badge color="sky">2</Badge> : null;
        if (isActive) return <Active key={item.title} navigationItem={item} context={context} />;
        return <Inactive key={item.title} navigationItem={item} context={context} />;
      })}
    </Flex>
  );
}

const commonButtonClasses =
  "w-full cursor-pointer justify-start gap-3 py-4 font-semibold border-[1px] justify-between  border-solid transition-colors duration-200";

function Active({ navigationItem, context }: { navigationItem: NavigationItem; context: ReactNode }) {
  return (
    <Button
      size="2"
      className={clsx("bg-grayA2 border-grayA4  border-[1px] border-solid py-4", commonButtonClasses)}
      asChild
      color="gray"
      variant="soft">
      <Link prefetch={false} href={navigationItem.route}>
        <Flex className="items-center gap-2">
          <navigationItem.icon width={16} height={16} />
          {navigationItem.title}
        </Flex>
        {context}
      </Link>
    </Button>
  );
}

function Inactive({ navigationItem, context }: { navigationItem: NavigationItem; context: ReactNode }) {
  return (
    <Button
      size="2"
      className={clsx(
        "hover:bg-grayA2 text-grayA8 hover:text-grayA11 border-transparent bg-transparent",
        commonButtonClasses,
      )}
      variant="soft"
      color="gray"
      asChild>
      <Link prefetch={false} href={navigationItem.route}>
        <Flex className="items-center gap-2">
          <navigationItem.icon width={16} height={16} />
          {navigationItem.title}
        </Flex>
        {context}
      </Link>
    </Button>
  );
}
