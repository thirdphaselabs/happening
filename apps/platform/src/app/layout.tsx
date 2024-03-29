import { ClerkProvider } from "@clerk/nextjs";
import { themeConfig } from "@plaventi/ui";
import { Theme } from "@radix-ui/themes";
import "../styles/radix.css";
import "../styles/input.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "../trpc/provider";

import type { Metadata } from "next";
import { nonNullableEnvironmentVariable } from "~/utils/env";

export const metadata: Metadata = {
  title: "Plaventi",
  description: "Events Re-imagined: Plan, Manage, Sell & Discover",
metadataBase: new URL(nonNullableEnvironmentVariable("NEXT_PUBLIC_BASE_URL")),
};

const inter = Inter({ subsets: ["latin"], variable: "--font-plaventi",});

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable}`}>
          <Theme {...themeConfig}>
            <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
            <Toaster
              duration={5000}
              expand={true}
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
