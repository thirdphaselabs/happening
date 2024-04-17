import { themeConfig } from "@plaventi/ui";
import { Theme } from "@radix-ui/themes";
import "../styles/radix.css";
import "../styles/input.css";
import "@plaventi/ui/src/radix.css";

import { cookies } from "next/headers";
import { TRPCReactProvider } from "../trpc/provider";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./_components/Providers";

export const metadata: Metadata = {
  title: "Plaventi",
  description: "Event planning, management & ticketing. All in one place.",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-plaventi" });

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme {...themeConfig} appearance="dark">
          <Providers cookies={cookies().toString()}>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
