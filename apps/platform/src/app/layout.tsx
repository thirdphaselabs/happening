import { ClerkProvider } from "@clerk/nextjs";
import { themeConfig } from "@plaventi/ui";
import { Box, Flex, Theme } from "@radix-ui/themes";
import "../styles/input.css";

import { cookies } from "next/headers";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "../trpc/provider";

import type { Metadata } from "next";
import { TopGradient } from "./_components/TopGradient";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { environment } from "~/utils/env";
import { MapProvider } from "./_components/map-provider";
import { TRPCContextProvider } from "./_components/trpc.context";
import { getSession } from "./actions";
import { se } from "date-fns/locale";

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
            <TRPCContextProvider accessToken={session ? session.accessToken : null}>
              <TRPCReactProvider cookies={cookies().get("wos-session")?.value}>
                <TopGradient />
                {children}
              </TRPCReactProvider>
            </TRPCContextProvider>
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
