"use client";

import { Link } from "@radix-ui/themes";
import NextLink from "next/link";
import { baseAccessColor } from "~/styles/theme";

export function GoToLogin() {
  return (
    <Link asChild size="2" underline={"hover"} color={baseAccessColor}>
      <NextLink href="/auth/login">Sign in</NextLink>
    </Link>
  );
}
