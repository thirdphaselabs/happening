"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { cn } from "~/lib/utils";

export default function ResponsiveSidebar({ children }: { children: ReactNode }) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Flex className="flex md:hidden">
        <Dialog.Root
          open={open}
          onOpenChange={(value) => {
            return setOpen(value);
          }}>
          <Dialog.Trigger asChild>
            <IconButton
              variant="soft"
              color="gray"
              size="2"
              className="hover:bg-sageA3 fixed left-4 top-[20px] z-50 bg-white "
              onClick={() => setOpen(!open)}>
              <HamburgerMenuIcon width={20} height={20} />
            </IconButton>
          </Dialog.Trigger>
          <Dialog.Portal container={container}>
            <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30" />
            <Dialog.Content
              className={cn(
                "bg-background fixed z-50 shadow-lg transition ease-in-out",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300",
                "data-[state=closed]:slide-out-to-left inset-y-0 left-0 data-[state=open]:duration-500",
                "data-[state=open]:slide-in-from-left",
              )}>
              {children}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <div ref={setContainer} />
      </Flex>
      <Flex className="hidden md:flex">{children}</Flex>
    </>
  );
}
