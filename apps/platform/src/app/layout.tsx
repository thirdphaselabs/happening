import { ClerkProvider } from "@clerk/nextjs";
import { themeConfig } from "@plaventi/ui";
import { Theme } from "@radix-ui/themes";
import "../styles/input.css";

import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "../trpc/provider";

import type { Metadata } from "next";
import { TopGradient } from "./_components/TopGradient";
import { getSession } from "./actions";

export const metadata: Metadata = {
  title: "Plaventi",
  description: "Events Re-imagined: Plan, Manage, Sell & Discover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const session = await getSession();
  return (
    <ClerkProvider>
      <html lang="en" style={{ backgroundColor: "#f4f5f6" }}>
        <body>
          <Theme
            {...themeConfig}
            style={{ backgroundColor: "#f4f5f6", overflow: "visible" }}
            id="root-radix-theme">
            <TRPCReactProvider>
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
