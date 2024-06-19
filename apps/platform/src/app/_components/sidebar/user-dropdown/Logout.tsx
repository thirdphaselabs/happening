"use client";

import { DropdownMenu } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { environment } from "~/utils/env";

const { appUrl } = environment;

export function Logout() {
  const router = useRouter();
  const logout = async () => {
    await fetch(`${appUrl}/log-out`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <DropdownMenu.Item color="red" onClick={logout}>
      Log out
    </DropdownMenu.Item>
  );
}
