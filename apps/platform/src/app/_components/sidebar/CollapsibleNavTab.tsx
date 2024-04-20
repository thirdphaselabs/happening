"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";
import { NavigationItem } from "./tyoes";
import useNavigation from "./_hooks/useNavigation";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { AccordionContent } from "../accordion";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-8 flex-1 items-center justify-between rounded-sm px-3 transition-all [&[data-state=open]>svg]:rotate-90",
        className,
      )}
      {...props}>
      {children}
      <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export default function CollbapsibleTab({ tab }: { tab: NavigationItem }) {
  const { activeRoute } = useNavigation();

  return (
    <AccordionPrimitive.Root
      className={"block xl:hidden"}
      type="single"
      collapsible
      defaultValue={activeRoute.route === tab.route ? "main" : undefined}>
      <AccordionPrimitive.Item value="main">
        <AccordionTrigger className="hover:bg-jadeA4 w-full cursor-default text-black hover:text-white">
          <div className="flex items-center justify-start gap-2 text-sm font-medium">
            <tab.icon width={16} height={16} />
            {tab.title}
          </div>
        </AccordionTrigger>
        <Accor  dionContent className="mt-1 space-y-1 pb-0">
          {tab.children.map((child) => (
            <Button
              key={child.href}
              size="2"
              className={cn(
                "hover:bg-jadeA4 w-full cursor-default justify-start pl-10 text-black",
                curChild?.href === child.href ? "bg-jadeA3" : "text-sage8 bg-transparent",
              )}
              asChild>
              <Link prefetch={false} href={child.href}>
                {child.title}
              </Link>
            </Button>
          ))}
        </AccordionContent>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
