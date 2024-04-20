"use client";

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { NavigationItem } from "~/types/types";
import useNavigation from "./_hooks/useNavigation";
import clsx from "clsx";

export default function NavigationItems() {
  const { activeRoute, navigationItems } = useNavigation();

  return (
    <Flex direction="column" px="4" gap="2" className="w-full">
      {navigationItems.map((item) => {
        const isActive = activeRoute.route === item.route;
        if (isActive) return <Active key={item.title} navigationItem={item} />;
        return <Inactive key={item.title} navigationItem={item} />;
      })}
    </Flex>
  );
}

const commonButtonClasses =
  "w-full cursor-pointer justify-start gap-3 py-4 font-semibold border-[1px] border-solid transition-colors duration-200";

function Active({ navigationItem }: { navigationItem: NavigationItem }) {
  return (
    <Button
      size="2"
      className={clsx("bg-grayA2 border-grayA4  border-[1px] border-solid py-4", commonButtonClasses)}
      asChild
      color="gray"
      variant="soft">
      <Link prefetch={false} href={navigationItem.route}>
        <navigationItem.icon width={16} height={16} />
        {navigationItem.title}
      </Link>
    </Button>
  );
}

function Inactive({ navigationItem }: { navigationItem: NavigationItem }) {
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
        <navigationItem.icon width={16} height={16} />
        {navigationItem.title}
      </Link>
    </Button>
  );
}
