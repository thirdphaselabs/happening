"use client";
import { Button } from "@plaventi/ui";
import { useRouter } from "next/navigation";

export function SignIn() {
  const router = useRouter();

  return <Button onClick={() => router.push("/sign-in")}>Sign In</Button>;
}
