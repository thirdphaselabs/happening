"use client";

import { FaGoogle } from "react-icons/fa";
import { type OAuthStrategy } from "@clerk/nextjs/server";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@plaventi/ui";
import { useSignInContext } from "../../login/_components/sign-in-context";
import Link from "next/link";

export function LoginWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link href="http://localhost:3002/api/auth/login">
      <Button
        size="3"
        variant="outline"
        color="gray"
        type="button"
        style={{ width: "100%" }}
        loading={{
          isLoading,
          hideIcon: true,
        }}
        onClick={() => {
          setIsLoading(true);
        }}>
        <FaGoogle />
        Continue with Google
      </Button>
    </Link>
  );
}
