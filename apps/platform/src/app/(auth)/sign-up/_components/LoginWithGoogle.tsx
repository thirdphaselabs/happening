"use client";

import { Button } from "@plaventi/ui";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { environment } from "~/utils/env";

const { apiUrl } = environment;

export function LoginWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link href={`${apiUrl}/api/auth/login`}>
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
