"use client";

import { FaGoogle } from "react-icons/fa";
import { type OAuthStrategy } from "@clerk/nextjs/server";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@plaventi/ui";

export function LoginWithGoogle() {
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
        await signInWith("oauth_google");
      }}>
      <FaGoogle />
      Continue with Google
    </Button>
  );
}
