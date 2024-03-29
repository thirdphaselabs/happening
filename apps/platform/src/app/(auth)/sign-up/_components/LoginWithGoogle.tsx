"use client";

import { Button } from "@radix-ui/themes";
import { Google } from "~/assets/Google";
import { FaGoogle } from "react-icons/fa";

export function LoginWithGoogle() {
  return (
    <Button
      size="3"
      variant="outline"
      color="gray"
      style={{ width: "100%" }}
      onClick={() => {
        alert(`Google authentication is coming soon`);
      }}>
      <FaGoogle />
      Sign up with Google
    </Button>
  );
}
