import { Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import { getSession } from "~/app/actions";
import { UserContextProvider } from "~/modules/auth/user.context";
import { Stepper } from "./_components/stepper";

export default async function OnboardingLayout({ children }: { children: ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });

  return (
    <UserContextProvider session={session}>
      <Flex gap="6" direction="column">
        {children}
        <Stepper />
      </Flex>
    </UserContextProvider>
  );
}
