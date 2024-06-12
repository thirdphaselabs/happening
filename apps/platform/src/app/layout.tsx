import { ClerkProvider } from "@clerk/nextjs";
import { themeConfig } from "@plaventi/ui";
import { Box, Flex, Theme } from "@radix-ui/themes";
import "../styles/input.css";

import { cookies } from "next/headers";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "../trpc/provider";

import type { Metadata } from "next";
import { TopGradient } from "./_components/TopGradient";

export const metadata: Metadata = {
  title: "Plaventi",
  description: "Events Re-imagined: Plan, Manage, Sell & Discover",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en" style={{ backgroundColor: "#f4f5f6" }}>
        <body>
          <Theme {...themeConfig} style={{ backgroundColor: "#f4f5f6", overflow: 'visible' }}>
            <TRPCReactProvider cookies={cookies().toString()}>
              <TopGradient />
              {children}
            </TRPCReactProvider>
            <Toaster
              duration={5000}
              closeButton={true}
              offset={14}
              expand={true}
              visibleToasts={3}
              position="top-center"
              toastOptions={{
                style: {
                  zIndex: 1001,
                  backgroundColor: "transparent",
                },
              }}
            />
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
