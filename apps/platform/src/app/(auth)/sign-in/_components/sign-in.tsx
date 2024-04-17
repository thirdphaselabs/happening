"use client";

import { useSignIn } from "@clerk/nextjs";
import { Button, TextFieldError, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, Link, Separator, Text, TextFieldInput, Theme } from "@radix-ui/themes";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import logo from "~/assets/logo-only.png";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import { baseAccessColor } from "~/styles/theme";
import { api } from "~/trpc/provider";
import { ClerkErrorType, clerkErrorTypeToCode, getExpectedClerkError } from "~/utils/error";
import { invariant } from "~/utils/helpers";
import { LoginWithGoogle } from "../../sign-up/_components/LoginWithGoogle";
import { SignInContextProvider, useSignInContext } from "./sign-in-context";

export function SignIn() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code");

  const isCode = errorCode === clerkErrorTypeToCode[ClerkErrorType.EmailAlreadyAssociated];

  return (
    <SignInContextProvider errorCode={isCode ? ClerkErrorType.EmailAlreadyAssociated : null}>
      <SignInInner />
    </SignInContextProvider>
  );
}

function SignInInner() {
  const { stage } = useSignInContext();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Theme appearance="dark" className="w-full">
      <Flex className="bg-skyDark1 h-screen w-full items-center justify-center">
        <Card className="bg-skyDark2 h-fit w-[480px] p-8">
          <Header />

          <Flex direction="column" gap="6" align="start" width="100%">
            {stage === "email" && <EmailStep />}
            {stage === "password" && <PasswordStep />}
            {(stage === "forgot-password" || stage === "reset-password") && <ResetPassword />}
            {(stage === "email" || stage === "password") && (
              <>
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
                    Don't have an account?{" "}
                    <Link asChild size="2" underline={"hover"} color={baseAccessColor}>
                      <NextLink href="/sign-up">Sign up</NextLink>
                    </Link>
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
        </Card>
      </Flex>
    </Theme>
  );
}

function Header() {
  const { stage } = useSignInContext();

  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" width="100%" mb="6">
        <Flex align="center" mb="4">
          <Image src={logo as StaticImport} alt="Logo" height="60" />
        </Flex>

        <Flex direction="column" gap="2">
          <Heading size="7">
            {stage === "forgot-password" || stage === "reset-password"
              ? "Reset your password"
              : "Sign in to Plaventi"}
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
  const { signIn } = useSignIn();

  const { mutateAsync } = api.auth.isEmailAssociatedWithAccount.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    invariant(signIn, "No signIn");
    const formData = new FormData(e.currentTarget);
    const emailAddress = formData.get("email") as string;

    if (!emailAddress) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    const result = await mutateAsync({ email: emailAddress });

    if (result.isAssociated && result.method === "google") {
      signIn.create({
        identifier: emailAddress,
        actionCompleteRedirectUrl: "/",
      });
      return;
    }

    setEmail(emailAddress);
    setStage("password");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-[160px] w-full items-center">
      <Flex direction="column" gap="4" width="100%">
        <TextFieldRoot>
          <TextFieldLabelContainer>
            <TextFieldLabel>Email</TextFieldLabel>
            {errorCode && <TextFieldError>You already have an account. Please sign in.</TextFieldError>}
          </TextFieldLabelContainer>
          <TextFieldInput
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
            disabled={!signIn}
            loading={{
              isLoading: loading,
              loadingText: "Validating your email",
            }}>
            Continuea <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

function PasswordStep() {
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn, setActive } = useSignIn();
  const { email, setStage } = useSignInContext();
  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invariant(signIn, "Sign up context is not available.");
    invariant(email, "Email is not available.");

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        return;
      }
      alert("erroe");
    } catch (error) {
      const clerkError = getExpectedClerkError(error, [
        ClerkErrorType.IncorrectPassword,
        ClerkErrorType.AccountNotFound,
      ]);
      switch (clerkError) {
        case ClerkErrorType.IncorrectPassword:
          setError("Incorrect password. Please try again.");
          break;
        case ClerkErrorType.AccountNotFound:
          setError("Account not found. Please sign up.");
          break;
        default:
          setError("An error occurred. Please try again.");
          break;
      }
      console.log({ error });
      setLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Flex direction="column" gap="4" width="100%">
        <label>
          <Text as="div" size="2" mb="1">
            Email
          </Text>

          <TextFieldInput
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
                    setStage("forgot-password");
                  }}>
                  <Text size="1" className="flex items-center gap-1">
                    Forgot your password?
                  </Text>
                </NextLink>
              </Link>
            )}
          </Flex>
          <TextFieldInput
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
              loadingText: "Validating credentials",
            }}>
            Continuea <ArrowRightIcon />
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
      const clerkError = getExpectedClerkError(error, [
        ClerkErrorType.AccountNotFound,
        ClerkErrorType.PasswordFoundInBreach,
        ClerkErrorType.IncorrectOTPCode,
        ClerkErrorType.VerificationFailedTooManyAttempts,
        ClerkErrorType.VerificationExpired,
      ]);
      switch (clerkError) {
        case ClerkErrorType.IncorrectOTPCode:
          setOtpError("Incorrect code. Please try again.");
          break;
        case ClerkErrorType.AccountNotFound:
          setError("Account not found. Please sign up.");
          break;
        case ClerkErrorType.PasswordFoundInBreach:
          setError("Password found in breach. Please try another one.");
          break;
        case ClerkErrorType.VerificationFailedTooManyAttempts:
          setError("Too many failed attempts. Please try again.");
          setShowReset(true);
          break;
        case ClerkErrorType.VerificationExpired:
          setError("Verification code expired. Please try again.");
          setShowReset(true);
          break;
        default:
          setError("An error occurred. Please try again.");
          break;
      }
      console.log({ error });
      setIsLoading(false);
    }
  };

  if (stage === "forgot-password") {
    return (
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex direction="column" gap="4" width="100%">
          <label>
            <Text as="div" size="2" mb="1">
              Email
            </Text>

            <TextFieldInput
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
                loadingText: "Validating credentials",
              }}>
              Send reset instructions{" "}
            </Button>
          </Flex>
          <Flex>
            <Text size="2" color="gray">
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
      <Flex direction="column" gap="4" width="100%">
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
          <TextFieldInput
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
              loadingText: "Validating credentials",
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
        <Flex>
          <Text size="2" color="gray">
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
