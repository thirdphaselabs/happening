import { Theme } from "@radix-ui/themes";
import "../styles/output.css";
import "@radix-ui/themes/styles.css";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "../trpc/provider";

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Theme>
          <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
        </Theme>
      </body>
    </html>
  );
}
