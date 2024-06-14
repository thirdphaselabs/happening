"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import { Box, Flex, Heading, IconButton, Separator } from "@radix-ui/themes";
import { cn } from "~/lib/utils";

const Root = (props: DialogPrimitive.DialogProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <Flex className="z-[5000]">{props.children}</Flex>
    </DialogPrimitive.Root>
  );
};
const Trigger = DialogPrimitive.Trigger;

interface ContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  header?: React.ReactNode;
  onClose?: () => void;
}

const Content = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ContentProps>(
  ({ className, header, children, ...props }, ref) => {
    const closeRef = React.useRef<HTMLButtonElement>(null);

    return (
      <DialogPrimitive.Content
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          closeRef.current?.focus();
        }}
        ref={ref}
        style={{
          backdropFilter: "blur(10px)",
        }}
        className={cn(
          "absolute left-0 top-0 z-[50001] h-screen w-screen bg-white/90 p-3",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:opacity overflow-none duration-100",
          className,
        )}
        {...props}>
        <div className="h-full">{children}</div>
        {/* header and close elements are absolute and after children to make it the last element for dialog autofocus on open */}
        {header}
        <DialogPrimitive.Close
          ref={closeRef}
          onClick={() => (props.onClose ? props.onClose() : undefined)}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground fixed right-8 top-5 z-[999999999999999] rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
          <IconButton size="2" variant="soft" type="button" color="gray">
            <Cross2Icon />
          </IconButton>
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    );
  },
);
Content.displayName = DialogPrimitive.Content.displayName;

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className=" left-0 right-0 top-0 z-[5001] h-[56px] bg-white">
    <div className={cn("flex h-full items-center justify-between gap-4 p-3", className)} {...props} />
    <Separator orientation="horizontal" size="1" className="w-full" />
  </div>
);
Header.displayName = "DialogHeader";

const Title = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4">
    <div className="h-4 w-4" /> {/* Placeholder for close */}
    <Heading size="3" weight="medium">
      {children}
    </Heading>
  </div>
);

const Portal = (props: DialogPrimitive.DialogPortalProps) => {
  const documentProxy =
    typeof document !== "undefined" ? document : { querySelector: (args: string) => null };
  return (
    <DialogPrimitive.Portal
      container={documentProxy.querySelector("#root-radix-theme") as HTMLElement}
      {...props}>
      {props.children}
    </DialogPrimitive.Portal>
  );
};

const Actions = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div autoFocus={false} className={cn("flex items-center gap-3", className)} {...props} />
);
Actions.displayName = "Actions";

export const FullScreenDialog = {
  Root,
  Trigger,
  Content,
  Header,
  Title,
  Portal,
  Actions,
  Overlay: DialogPrimitive.Overlay,
};
