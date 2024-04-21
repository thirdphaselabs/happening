import { ClerkProvider } from "@clerk/nextjs";
import { themeConfig } from "@plaventi/ui";
import { Theme } from "@radix-ui/themes";
import "../styles/radix.css";
import "../styles/input.css";

import { cookies } from "next/headers";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "../trpc/provider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plaventi",
  description: "Events Re-imagined: Plan, Manage, Sell & Discover",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Theme {...themeConfig}>
            <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
            <Toaster
              duration={5000}
              closeButton={true}
              offset={14}
              expand={true}
              visibleToasts={3}
              position="top-center"
              toastOptions={{
                style: {
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
