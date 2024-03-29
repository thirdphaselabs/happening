"use client";
import { useClerk, useSession } from "@clerk/nextjs";
import { Button } from "@plaventi/ui";
import { useRouter } from "next/navigation";
import { invariant } from "~/utils/helpers";
import { toast } from "sonner";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export function SignOut() {
  const { isLoaded } = useSession();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <>
      <Button disabled={!isLoaded} onClick={() => signOut(() => router.push("/"))}>
        Sign out
      </Button>
      <Button
        onClick={() => {
          toast.custom(
            () => (
              <Callout.Root>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  You will need admin privileges to install and access this application.
                </Callout.Text>
                <Button>Undo</Button>
              </Callout.Root>
            ),
            { dismissible: true },
          );
        }}>
        Sonner
      </Button>
    </>
  );
}
