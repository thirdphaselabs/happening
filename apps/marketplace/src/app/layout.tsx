import { Theme } from "@radix-ui/themes";
import "../styles/input.css";
import "@plaventi/ui/src/radix.css";

import { cookies } from "next/headers";
import { TRPCReactProvider } from "../trpc/provider";

import { themeConfig } from "@plaventi/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plaventi",
  description: "Event planning, management & ticketing. All in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Theme {...themeConfig} appearance="dark">
          <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
        </Theme>
      </body>
    </html>
  );
}
