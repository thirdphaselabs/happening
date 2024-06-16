"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { DropdownMenu } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { environment } from "~/utils/env";

const { apiUrl } = environment;

export function Logout() {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <DropdownMenu.Item
      color="red"
      onClick={() => {
        if (!signOut) throw new Error("signOut is not defined");
        signOut();
        router.push(`${apiUrl}/api/auth/logout`);
      }}>
      Log out
    </DropdownMenu.Item>
  );
}
