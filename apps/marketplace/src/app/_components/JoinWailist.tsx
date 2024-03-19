"use client";

import { Flex, TextFieldInput, Button, Text, Callout } from "@radix-ui/themes";
import { useState } from "react";
import { api } from "~/trpc/provider";
import { AiOutlineLoading3Quarters, AiOutlineWarning } from "react-icons/ai";
import { assertError, getTRPCError } from "~/utils/error";
import {
  CheckCircledIcon,
  Cross1Icon,
  Cross2Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { parseTRPCMessage } from "@trpc/server/rpc";

export function JoinWaitlist() {
  const [error, setError] = useState<"already-joined" | "unknown" | "validation" | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  const { mutateAsync: join } = api.waitlist.join.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setSuccess(false);
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");

      if (typeof email !== "string") {
        return;
      }

      await join({ email });
      setSuccess(true);
    } catch (error) {
      const trpcError = getTRPCError(error);

      if (!trpcError) {
        setError("unknown");
        return;
      }

      switch (trpcError.code) {
        case "CONFLICT": {
          setError("already-joined");
          break;
        }
        case "BAD_REQUEST": {
          setError("validation");
          break;
        }
        default: {
          setError("unknown");
          break;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex w-full flex-col items-center gap-4" onSubmit={handleSubmit}>
      <Flex
        px="4"
        gap="2"
        width="100%"
        justify="center"
        className="max-w-[750px]"
        direction={{
          initial: "column",
          md: "row",
        }}>
        <TextFieldInput
          variant="classic"
          className="h-[48px] w-full md:w-[295px]"
          placeholder="Enter your email"
          size="3"
          name="email"
          type="email"
          required
          disabled={loading}
        />
        <Button size="3" className="h-[48px] w-[108px]" disabled={loading}>
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
            </>
          ) : (
            "Notify me"
          )}
        </Button>
      </Flex>
      <Callout.Root
        color={success ? "green" : error === "already-joined" ? "amber" : "red"}
        className={`h-[52px]  ${error !== null || success ? "visible" : "invisible"}`}>
        {error !== null ? <Error type={error} /> : success ? <Success /> : null}
      </Callout.Root>
    </form>
  );
}

function Success() {
  return (
    <>
      <Callout.Icon>
        <CheckCircledIcon />
      </Callout.Icon>
      <Callout.Text>Success, you're on the list. We'll be in touch soon!</Callout.Text>
    </>
  );
}

function Error({ type }: { type: "already-joined" | "unknown" | "validation" }) {
  return (
    <>
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>
        {type === "already-joined"
          ? "You're already on the waitlist. We'll be in touch soon."
          : type === "validation"
            ? "Invalid email, please enter a valid email."
            : "An error occurred while trying to join the waitlist. Please try again."}
      </Callout.Text>
    </>
  );
}
