"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { DropdownMenu } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export function Logout() {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <DropdownMenu.Item
    color="red"
      onClick={() => {
        console.log("signOut", signOut);
        if (!signOut) throw new Error("signOut is not defined");
        signOut();
        router.push("/");
      }}>
      Log out
    </DropdownMenu.Item>
  );
}
