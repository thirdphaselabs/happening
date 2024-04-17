import { themeConfig } from "@plaventi/ui";
import { Theme } from "@radix-ui/themes";
import { TRPCReactProvider } from "~/trpc/provider";

export function Providers({ children, cookies }: { children: React.ReactNode; cookies: string }) {
  return (
    <Theme>
      <TRPCReactProvider cookies={cookies}>{children}</TRPCReactProvider>
    </Theme>
  );
}
