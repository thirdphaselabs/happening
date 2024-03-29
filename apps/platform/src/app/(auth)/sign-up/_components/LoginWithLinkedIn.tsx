"use client";

import { Button } from "@radix-ui/themes";
import { LinkedIn } from "~/assets/LinkedIn";

export function LoginWithLinkedIn() {
  return (
    <Button
      variant="outline"
      color="gray"
      style={{ width: "100%" }}
      onClick={() => {
        alert(`LinkedIn authentication is coming soon`);
      }}>
      <LinkedIn />
      Continue with LinkedIn
    </Button>
  );
}
