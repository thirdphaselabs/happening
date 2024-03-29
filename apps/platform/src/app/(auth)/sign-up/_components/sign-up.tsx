"use client";

import { useSession, useSignUp, useUser } from "@clerk/nextjs";
import { Button } from "@plaventi/ui";
import { ArrowRightIcon, CheckCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  Avatar,
  Flex,
  Heading,
  HoverCard,
  IconButton,
  Separator,
  Text,
  TextFieldInput,
  Theme,
  Tooltip
} from "@radix-ui/themes";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import logo from "~/assets/logo-only.png";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import { api } from "~/trpc/provider";
import {
  ClerkErrorType,
  clerkErrorTypeToCode,
  getExpectedClerkError
} from "~/utils/error";
import { invariant } from "~/utils/helpers";
import { GoToLogin } from "./GoToLogin";
import { LoginWithGoogle } from "./LoginWithGoogle";
import { SignUpContextProvider, useSignUpContext } from "./sign-up-context";

export function SignUpForm() {
  const { signUp, isLoaded } = useSignUp();
  const ticket = useSearchParams().get("__clerk_ticket");

  if (!isLoaded) return null;

  const isMissingPassword = signUp.missingFields.includes("password");

  return (
    <SignUpContextProvider
      email={signUp.emailAddress}
      isMissingPassword={isMissingPassword}
      ticket={ticket ?? undefined}>
      <SignUpFormInner />
    </SignUpContextProvider>
  );
}

function SignUpFormInner() {
  const { user, isLoaded } = useUser();
  const { stage, setStage, setEmail, ticket } = useSignUpContext();
  const { signUp } = useSignUp();
  const { session, isLoaded: isSessionLoaded } = useSession();

  if (!isLoaded || !isSessionLoaded) return null;

  return (
    <Flex direction="column" mx="auto" className="w-full max-w-[450px]">
      <Flex direction="column" width="100%" mb="6">
        <Flex align="center" mb="4">
          <Image src={logo as StaticImport} alt="Logo" height="60" />
        </Flex>

        <Flex direction="column" gap="2">
          <Heading size="7">
            {stage === "email-verification" ? "Verify your email" : "Create your Plaventi account"}
          </Heading>
        </Flex>
      </Flex>

      <Flex direction="column" gap="6" align="start" width="100%">
        {stage === "email" && <EmailStep />}
        {stage === "password" && <PasswordStep />}
        {stage === "email-verification" && <EmailVerification />}

        {(stage === "email" || stage === "password") && !ticket && (
          <>
            {" "}
            <Flex width="100%" align="center" gap="3">
              <Separator orientation="horizontal" style={{ width: "100%" }} />
              <Text color="gray" size="1">
                {" "}
                OR
              </Text>
              <Separator orientation="horizontal" style={{ width: "100%" }} />
            </Flex>
            <Flex width="100%" direction="column" gap="4">
              <LoginWithGoogle />
            </Flex>
            <Flex width="100%" justify="center">
              <Text size="2" color="gray">
                Already have a Plaventi account? <GoToLogin />
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

function EmailStep() {
  const { stage, setStage, setEmail } = useSignUpContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { signUp } = useSignUp();

  const { mutateAsync } = api.auth.isEmailAssociatedWithAccount.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    invariant(signUp, "No signup");
    const formData = new FormData(e.currentTarget);
    const emailAddress = formData.get("email") as string;

    if (!emailAddress) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    const result = await mutateAsync({ email: emailAddress });
    try {
      await signUp.create({ emailAddress });
    } catch (err) {
      const clerkError = getExpectedClerkError(err, [ClerkErrorType.EmailAlreadyAssociated]);
      console.log({ err, clerkError });
      switch (clerkError) {
        case ClerkErrorType.EmailAlreadyAssociated:
          router.push(`/sign-in?code=${clerkErrorTypeToCode[ClerkErrorType.EmailAlreadyAssociated]}`);
          return;
        default:
          break;
      }
      console.log("create signup error", err);
    }
    try {
      await signUp.update({ emailAddress });
    } catch (err) {
      console.log("update signup error", err);
    }

    if (!result) {
      router.push("/sign-in");
    }

    setEmail(emailAddress);
    setStage("password");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-[160px] w-full items-center">
      <Flex direction="column" gap="4" width="100%">
        <label>
          <Text as="div" size="2" mb="1">
            Email
          </Text>
          <TextFieldInput
            size="3"
            placeholder="Enter your email address"
            name="email"
            type="email"
            required
          />
        </label>

        <Flex width="100%" direction="column" gap="3">
          <Button
            size="3"
            loading={{
              isLoading: loading,
              loadingText: "Validating your email",
            }}>
            Continue <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

function PasswordStep() {
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, setActive } = useSignUp();
  const { email, ticket, setStage } = useSignUpContext();
  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invariant(signUp, "Sign up context is not available.");

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    try {
      if (ticket) {
        const result = await signUp.create({ ticket, strategy: ticket ? "ticket" : undefined, password });
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
        }
      } else {
        invariant(email, "Email is not available.");
        await signUp.create({ emailAddress: email, password });
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setStage("email-verification");
      }
    } catch (error) {
      const errorType = getExpectedClerkError(error, [
        ClerkErrorType.EmailAlreadyAssociated,
        ClerkErrorType.PasswordTooShort,
      ]);

      switch (errorType) {
        case ClerkErrorType.EmailAlreadyAssociated:
          router.push("/sign-in");
          return;
        case ClerkErrorType.PasswordTooShort:
          setError("Password is too short.");
          return;
        default:
          setError("Unknown error. Please try again.");
          return;
      }
    } finally {
      setLoading(false);
    }
  };

  if (!email && !ticket) {
    return null;
  }

  return (
    <form className="h-[160px] w-full" onSubmit={handleSubmit}>
      <Flex direction="column" gap="4" width="100%">
        {!ticket && email && (
          <Flex width="100%" justify="between" align="center" color="gray">
            <Flex gap="2" align="center">
              <Avatar size="2" fallback={email.slice(0, 1)}></Avatar>
              <Text>{email}</Text>
            </Flex>
            <Tooltip content="Change email">
              <IconButton variant="ghost" color="gray" type="button" onClick={() => setStage("email")}>
                <Cross2Icon />
              </IconButton>
            </Tooltip>
          </Flex>
        )}
        <label>
          <Flex justify="between" width="100%" gap="1" mb="1">
            <Text as="div" size="2">
              Password
            </Text>
            {isPasswordStrong !== null && !error && <PasswordStrength isPasswordStrong={isPasswordStrong} />}
            {error && (
              <Text size="1" color="red" className="flex items-center gap-1">
                {error}
              </Text>
            )}
          </Flex>
          <TextFieldInput
            size="3"
            placeholder="Choose a strong password"
            name="password"
            type="password"
            required
            onChange={(e) => {
              const password = e.target.value;
              if (password.length < 5) {
                setIsPasswordStrong(null);
              } else if (password.length < 8) {
                setIsPasswordStrong(false);
              } else if (password.length < 12) {
                setIsPasswordStrong(true);
              }
            }}
          />
        </label>

        <Flex direction="column" gap="3">
          <Button
            className="w-full"
            disabled={loading}
            size="3"
            loading={{
              isLoading: loading,
              loadingText: "Validating credentials",
            }}>
            Continue <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

function PasswordStrength({ isPasswordStrong }: { isPasswordStrong: boolean }) {
  if (!isPasswordStrong) {
    return (
      <Text size="1" color="gray">
        Password is too weak.{" "}
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Text size="1" color="gray" highContrast>
              Why?
            </Text>
          </HoverCard.Trigger>
          <Theme appearance="light">
            <HoverCard.Content>
              <Flex gap="4">
                <ul className="list-disc pl-4">
                  <li>
                    <Text size="1">Must be at least 8 characters long</Text>
                  </li>
                  <li>
                    <Text size="1">Must contain at least one uppercase letter</Text>
                  </li>
                  <li>
                    <Text size="1">Must contain at least one lowercase letter</Text>
                  </li>
                  <li>
                    <Text size="1">Must contain at least one number</Text>
                  </li>
                </ul>
              </Flex>
            </HoverCard.Content>
          </Theme>
        </HoverCard.Root>
      </Text>
    );
  }

  return (
    <Text size="1" color="gray" className="flex gap-1">
      Strong <CheckCircledIcon className="text-sky10" />
    </Text>
  );
}

function EmailVerification() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const { email } = useSignUpContext();
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);
  const [previousLength, setPreviousLength] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [showReset, setShowReset] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!signUp) return;

    try {
      const code = new FormData(e.currentTarget).get("code") as string;
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/onboarding");
        return;
      }
    } catch (error) {
      const clerkError = getExpectedClerkError(error, [
        ClerkErrorType.IncorrectOTPCode,
        ClerkErrorType.VerificationFailedTooManyAttempts,
      ]);
      switch (clerkError) {
        case ClerkErrorType.IncorrectOTPCode:
          setError("Incorrect code. Please try again.");
          break;
        case ClerkErrorType.VerificationFailedTooManyAttempts:
          setError("Verification failed, too many attempts.");
          setShowReset(true);
          break;
        default:
          setError("An error occurred. Please try again.");
          break;
      }
      setLoading(false);
    }
  };

  return (
    <form className=" w-full" onSubmit={handleSubmit} ref={ref}>
      <Flex direction="column" gap="5">
        <Text size="2" color="gray" className="max-w-[300px]">
          We've sent an email with a verification code to{" "}
          <Text color="gray" highContrast>
            {email}
          </Text>
        </Text>
        <Flex direction="column" gap="5" width="100%" align="center">
          <InputOTP
            maxLength={6}
            name="code"
            onChange={(val) => {
              if (error) setError(null);

              if (previousLength === 0 && val.length === 6) {
                ref.current?.requestSubmit();
                return;
              }
              setPreviousLength(val.length);
            }}>
            <InputOTPGroup>
              <InputOTPSlot index={0} error={error !== null} />
              <InputOTPSlot index={1} error={error !== null} />
              <InputOTPSlot index={2} error={error !== null} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} error={error !== null} />
              <InputOTPSlot index={4} error={error !== null} />
              <InputOTPSlot index={5} error={error !== null} />
            </InputOTPGroup>
          </InputOTP>

          <Flex direction="column" gap="3" width="100%">
            <Button
              className="w-full"
              disabled={loading}
              size="3"
              onClick={() => {
                ref.current?.requestSubmit();
              }}
              loading={{
                isLoading: loading,
                loadingText: "Verifying code",
              }}
              error={{
                isError: error !== null,
                errorText: error ?? undefined,
              }}>
              Verify
            </Button>
            {showReset && (
              <Button
                className="w-full"
                size="3"
                onClick={() => {
                  signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
                  setShowReset(false);
                  setError(null);
                }}>
                Resend
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
}
