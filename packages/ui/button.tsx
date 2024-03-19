"use client";

import { Button as RButton } from "@radix-ui/themes";
import type { ButtonProps } from "@radix-ui/themes/dist/cjs/components/button";
import type { ReactNode } from "react";

export function Button({ children }: { children: ReactNode } & ButtonProps): JSX.Element {
  return <RButton>{children}</RButton>;
}
