"use client";

import { BadgeProps, Badge as RBadge } from "@radix-ui/themes";
import { cn } from "./utils/helpers";

export function Badge({ children, color, className, ...rest }: BadgeProps): JSX.Element {
  return (
    <RBadge
      className={cn("bg-sky-transparent border-white15 border-[1px] px-4 py-[5px] text-white", className)}
      color={color}
      {...rest}>
      {children}
    </RBadge>
  );
}
