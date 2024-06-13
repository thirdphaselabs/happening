"use client";

import { useSignIn, useUser } from "@clerk/nextjs";
import { Button, TextFieldError, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Link, Text, TextField } from "@radix-ui/themes";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { EventsManagerBadge } from "~/app/_components/EventsManagerBadge";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import { baseAccessColor } from "~/styles/theme";
import { api } from "~/trpc/provider";
import { AuthErrorType, clerkErrorTypeToCode, getExpectedAuthenticationError } from "~/utils/error";
import { invariant } from "~/utils/helpers";
import { LoginWithGoogle } from "../../sign-up/_components/LoginWithGoogle";
import { SignInContextProvider, useSignInContext } from "./sign-in-context";

export function SignIn() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code");
  const email = searchParams.get("email");

  const isCode = errorCode === clerkErrorTypeToCode[AuthErrorType.EmailAlreadyAssociated];

  console.log({ errorCode });

  return (
    <SignInContextProvider
      errorCode={isCode ? AuthErrorType.EmailAlreadyAssociated : null}
      email={email ?? undefined}>
      <SignInInner />
    </SignInContextProvider>
  );
}

function SignInInner() {
  const { stage } = useSignInContext();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Flex direction="column" mx="auto" className="w-full max-w-[450px]">
      <Flex direction="column" align="center" width="100%" gap="6">
        <Header />

        <Flex direction="column" gap="6" align="start" width="100%">
          {stage === "email" && <EmailStep />}
          {stage === "password" && <PasswordStep />}
          {(stage === "forgot-password" || stage === "reset-password") && <ResetPassword />}
          {(stage === "email" || stage === "password") && (
            <>
              <Flex width="100%" justify="center">
                <Text size="2" color="gray">
                  Don't have an account?{" "}
                  <Link asChild size="2" underline={"hover"} color={baseAccessColor}>
                    <NextLink href="/sign-up">Sign up</NextLink>
                  </Link>
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

function Header() {
  const { stage } = useSignInContext();

  return (
    <Flex direction="column" align="center" justify="center" gap="5">
      <Flex direction="column" width="100%" gap="6" align="center" justify="center">
        <Flex align="center">
          <EventsManagerBadge />
        </Flex>

        <Flex direction="column" gap="2">
          <Heading size="7">
            {stage === "forgot-password" || stage === "reset-password"
              ? "Reset your password"
              : "Sign in your account"}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}

function EmailStep() {
  const { stage, setStage, setEmail, errorCode } = useSignInContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { mutateAsync } = api.auth.isEmailAssociatedWithAccount.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const emailAddress = formData.get("email") as string;

    if (!emailAddress) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    // const result = await mutateAsync({ email: emailAddress });

    // if (result.isAssociated && result.method === "google") {
    //   await signIn.authenticateWithRedirect({
    //     strategy: "oauth_google",
    //     redirectUrl: "/sso-callback",
    //     redirectUrlComplete: "/",
    //   });
    //   return;
    // }

    setEmail(emailAddress);
    setStage("password");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex  w-full items-center">
      <Flex direction="column" gap="6" width="100%">
        <TextFieldRoot>
          <TextFieldLabelContainer>
            <TextFieldLabel>Email</TextFieldLabel>
            {errorCode && (
              <TextFieldError isVisible>You already have an account. Please sign in.</TextFieldError>
            )}
          </TextFieldLabelContainer>
          <TextField.Root
            size="3"
            placeholder="Enter your email address"
            name="email"
            type="email"
            required
          />
        </TextFieldRoot>

        <Flex width="100%" direction="column" gap="3">
          <Button
            style={{ width: "100%" }}
            size="3"
            loading={{
              isLoading: loading,
            }}>
            Continue <ArrowRightIcon />
          </Button>
          <Flex width="100%" direction="column" gap="4">
            <LoginWithGoogle />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
}

function PasswordStep() {
  const [loading, setLoading] = useState<boolean>(false);
  const { email, setStage, errorCode, clearError } = useSignInContext();
  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { mutateAsync: signIn } = api.auth.signIn.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    clearError();
    setError(null);
    e.preventDefault();
    invariant(signIn, "Sign up context is not available.");
    invariant(email, "Email is not available.");

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    try {
      console.log("email", email);
      const result = await signIn({
        email,
        password,
      });
      router.push("/");
    } catch (error) {
      console.error("errr mate", error);
      const { clerkErrorType, errorMessage } = getExpectedAuthenticationError(error, [
        AuthErrorType.InvalidCredentials,
        AuthErrorType.AccountNotFound,
        AuthErrorType.ToManyRequests,
      ]);
      if (!clerkErrorType) {
        setError(errorMessage);
        setLoading(false);
        return;
      }
      switch (clerkErrorType) {
        case AuthErrorType.InvalidCredentials:
          setError("Invalid credentials. Please try again.");
          break;
        case AuthErrorType.AccountNotFound:
          setError("Account not found. Please sign up.");
          break;
        case AuthErrorType.ToManyRequests:
          setError("Too many requests. Please try again later.");
          break;
        default:
          setError("An error occurred. Please try again.");
          break;
      }
      setLoading(false);
    }
  };

  if (!email) {
    return <p>no email</p>;
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Flex direction="column" gap="4" width="100%">
        <label>
          <TextFieldLabelContainer>
            <TextFieldLabel>Email</TextFieldLabel>
            {errorCode && (
              <TextFieldError isVisible>You already have an account. Please sign in.</TextFieldError>
            )}
          </TextFieldLabelContainer>

          <TextField.Root
            defaultValue={email}
            size="3"
            placeholder="Enter your email address"
            name="email"
            type="email"
            required
          />
        </label>
        <label>
          <Flex justify="between" width="100%" gap="1" mb="1">
            <Text as="div" size="2">
              Password
            </Text>
            {error ? (
              <Text size="1" color="red" className="flex items-center gap-1">
                {error}
              </Text>
            ) : (
              <Link>
                <NextLink
                  href="/sign-in?stage=forgot-password"
                  onClick={() => {
                    clearError();
                    setStage("forgot-password");
                  }}>
                  <Text size="1" className="flex items-center gap-1">
                    Forgot your password?
                  </Text>
                </NextLink>
              </Link>
            )}
          </Flex>
          <TextField.Root
            size="3"
            placeholder="Enter your password"
            name="password"
            type="password"
            required
          />
        </label>

        <Flex direction="column" gap="3" width="100%">
          <Button
            disabled={loading || !signIn}
            size="3"
            loading={{
              isLoading: loading,
            }}>
            Continue <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

export function ResetPassword() {
  const { email, setStage, stage } = useSignInContext();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [showReset, setShowReset] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invariant(signIn, "SignIn not initialized");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      alert("Enter an email");
      return;
    }

    await signIn.create({
      strategy: "reset_password_email_code",
      identifier: email,
    });
    setStage("reset-password");
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invariant(signIn, "Sign up context is not available.");
    invariant(email, "Email is not available.");

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const code = formData.get("code") as string;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        return;
      }
      alert("error");
    } catch (error) {
      const { clerkErrorType, errorMessage } = getExpectedAuthenticationError(error, [
        AuthErrorType.AccountNotFound,
        AuthErrorType.PasswordFoundInBreach,
        AuthErrorType.IncorrectOTPCode,
        AuthErrorType.VerificationFailedTooManyAttempts,
        AuthErrorType.VerificationExpired,
      ]);
      if (!clerkErrorType) {
        setError(errorMessage);
        setIsLoading(false);
        return;
      }
      switch (clerkErrorType) {
        case AuthErrorType.IncorrectOTPCode:
          setOtpError("Incorrect code. Please try again.");
          break;
        case AuthErrorType.AccountNotFound:
          setError("Account not found. Please sign up.");
          break;
        case AuthErrorType.PasswordFoundInBreach:
          setError("Password found in breach. Please try another one.");
          break;
        case AuthErrorType.VerificationFailedTooManyAttempts:
          setError("Too many failed attempts. Please try again.");
          setShowReset(true);
          break;
        case AuthErrorType.VerificationExpired:
          setError("Verification code expired. Please try again.");
          setShowReset(true);
          break;
        default:
          setError("An error occurred. Please try again.");
          break;
      }
      setIsLoading(false);
    }
  };

  if (stage === "forgot-password") {
    return (
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex direction="column" gap="6" width="100%">
          <label>
            <Text as="div" size="2" mb="1">
              Email
            </Text>

            <TextField.Root
              defaultValue={email}
              size="3"
              placeholder="Enter your email address"
              name="email"
              type="email"
              required
            />
          </label>
          <Flex direction="column" gap="3" width="100%">
            <Button
              disabled={loading || !isLoaded}
              size="3"
              loading={{
                isLoading: loading,
              }}>
              Send reset instructions{" "}
            </Button>
          </Flex>
          <Flex justify="center" align="center">
            <Text size="2" color="gray" align="center">
              Don't want to reset your password?{" "}
              <Link asChild size="2" underline={"hover"} color={baseAccessColor}>
                <NextLink href="/sign-in" onClick={() => setStage("password")}>
                  Sign in
                </NextLink>
              </Link>
            </Text>
          </Flex>
        </Flex>
      </form>
    );
  }

  return (
    <form className="w-full" onSubmit={handlePasswordReset}>
      <Flex direction="column" gap="6" width="100%">
        <Flex direction="column" gap="6" justify="center" align="center">
          <Text size="2" color="gray" className="max-w-[300px] text-center">
            We've sent an email with a verification code to{" "}
            <Text color="gray" highContrast>
              {email}
            </Text>
          </Text>
          <Flex direction="column" gap="6" width="100%" align="center">
            <InputOTP
              maxLength={6}
              name="code"
              onChange={(val) => {
                if (otpError) setOtpError(null);
              }}>
              <InputOTPGroup>
                <InputOTPSlot index={0} error={otpError !== null} />
                <InputOTPSlot index={1} error={otpError !== null} />
                <InputOTPSlot index={2} error={otpError !== null} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} error={otpError !== null} />
                <InputOTPSlot index={4} error={otpError !== null} />
                <InputOTPSlot index={5} error={otpError !== null} />
              </InputOTPGroup>
            </InputOTP>
          </Flex>
        </Flex>

        <label>
          <Flex justify="between" width="100%" gap="1" mb="1">
            <Text as="div" size="2">
              New password
            </Text>
            {error && (
              <Text size="1" color="red" className="flex items-center gap-1">
                {error}
              </Text>
            )}
          </Flex>
          <TextField.Root
            size="3"
            placeholder="Enter your new password"
            name="password"
            type="password"
            required
          />
        </label>
        <Flex direction="column" gap="3" width="100%">
          <Button
            disabled={loading || !isLoaded || showReset}
            size="3"
            loading={{
              isLoading: loading,
            }}
            error={{
              errorText: otpError ?? undefined,
              isError: !!otpError,
            }}>
            Reset password
          </Button>
          {showReset && (
            <Button
              className="w-full"
              size="3"
              onClick={() => {
                setError(null);
                setOtpError(null);
                setShowReset(false);
                setStage("forgot-password");
              }}>
              Start again
            </Button>
          )}
        </Flex>
        <Flex justify="center" width="100%" align="center">
          <Text size="2" color="gray" align="center">
            Don't want to reset your password?{" "}
            <Link asChild size="2" underline={"hover"} color={baseAccessColor}>
              <NextLink href="/sign-in" onClick={() => setStage("password")}>
                Sign in
              </NextLink>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </form>
  );
}
