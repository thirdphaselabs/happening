"use client";

import { FaMicrosoft } from "react-icons/fa";
import { type OAuthStrategy } from "@clerk/nextjs/server";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@plaventi/ui";
import { useState } from "react";

export function LoginWithMicrosoft() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    if (!signIn) {
      return;
    }
    setIsLoading(true);
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <Button
      size="3"
      variant="outline"
      color="gray"
      style={{ width: "100%" }}
      loading={{
        isLoading,
        hideIcon: true,
      }}
      onClick={async () => {
        await signInWith("oauth_microsoft");
      }}>
      <FaMicrosoft size="18" />
      Continue with Microsoft
    </Button>
  );
}
