"use client";

import { useClerk, useSession, useSignUp, useUser } from "@clerk/nextjs";
import { Button } from "@plaventi/ui";
import { ArrowRightIcon, CheckCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  Avatar,
  Flex,
  Heading,
  HoverCard,
  IconButton,
  Link,
  Text,
  TextField,
  Theme,
  Tooltip,
} from "@radix-ui/themes";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { EventsManagerBadge } from "~/app/_components/EventsManagerBadge";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import { baseAccessColor } from "~/styles/theme";
import { api } from "~/trpc/provider";
import { ClerkErrorType, clerkErrorTypeToCode, getExpectedClerkError } from "~/utils/error";
import { invariant } from "~/utils/helpers";
import { GoToLogin } from "./GoToLogin";
import { LoginWithGoogle } from "./LoginWithGoogle";
import { SignUpContextProvider, useSignUpContext } from "./sign-up-context";

const refresh = async () => {
  const res = await fetch("http://localhost:3002/api/auth/refresh", {
    credentials: "include",
  });
};

export function SignUpForm() {
  const ticket = useSearchParams().get("__clerk_ticket");

  return (
    <SignUpContextProvider userId={null} email={null} isMissingPassword={false} ticket={ticket ?? undefined}>
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
      <Flex direction="column" align="center" width="100%" gap="6">
        <Flex align="center" justify="center" mb="4">
          <EventsManagerBadge />
        </Flex>

        <Flex direction="column" gap="2" align="center">
          <Heading size="7" mb="0">
            {stage === "email-verification" ? "Verify your email" : "Create your account"}
          </Heading>
          <Text size="2" color="gray" weight="light">
            Join the new age of event planning.
          </Text>
        </Flex>

        <Flex direction="column" gap="6" align="start" width="100%">
          {stage === "email" && <EmailStep />}
          {stage === "password" && <PasswordStep />}
          {stage === "email-verification" && <EmailVerification />}
          {stage === "personal-details" && <PersonalDetails />}
        </Flex>

        {(stage === "email" || stage === "password") && !ticket && (
          <Flex width="100%" justify="center">
            <Text size="2" color="gray">
              Already have an account? <GoToLogin />
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

function EmailStep() {
  const { stage, setStage, setEmail, setUserId } = useSignUpContext();
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

    const { isAssociated, isEmailVerified, userId } = await mutateAsync({ email: emailAddress });

    if (!isAssociated) {
      setEmail(emailAddress);
      setStage("password");
      setLoading(false);
      return;
    }

    if (isEmailVerified) {
      router.push("/sign-in?code=email_verified");
      return;
    }

    if (!isEmailVerified) {
      setStage("email-verification");
      setUserId(userId);
      setLoading(false);
      return;
    }

    setEmail(emailAddress);
    setStage("password");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center">
      <Flex direction="column" gap="6" width="100%">
        <label>
          <Text as="div" size="3" mb="1">
            Email
          </Text>
          <TextField.Root
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
  const { email, ticket, setStage, setPassword, setUserId } = useSignUpContext();
  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { mutateAsync: signUp } = api.auth.signUp.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invariant(signUp, "Sign up context is not available.");

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    try {
      invariant(email, "Email is not available.");
      setPassword(password);
      const user = await signUp({ email, password });
      setUserId(user.id);
      setStage("email-verification");
    } catch (error) {
      const { clerkErrorType, errorMessage } = getExpectedClerkError(error, [
        ClerkErrorType.EmailAlreadyAssociated,
        ClerkErrorType.PasswordTooShort,
        ClerkErrorType.PasswordFoundInBreach,
      ]);

      if (!clerkErrorType) {
        setError(errorMessage);
        return;
      }

      switch (clerkErrorType) {
        case ClerkErrorType.EmailAlreadyAssociated:
          router.push("/sign-in?code=form_identifier_exists");
          return;
        case ClerkErrorType.PasswordTooShort:
          setError("Password is too short.");
          return;
        case ClerkErrorType.PasswordFoundInBreach:
          setError("Password has been found in breach. Please try another one.");
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
          <Flex width="100%" justify="between" align="center">
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
          <TextField.Root
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
      Strong <CheckCircledIcon style={{ color: "var(--jade-10)" }} />
    </Text>
  );
}

function EmailVerification() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const { signOut } = useClerk();
  const { session } = useSession();
  const { email, setStage, userId, password } = useSignUpContext();
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);
  const [previousLength, setPreviousLength] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [showReset, setShowReset] = useState<boolean>(false);
  const { mutateAsync: resendVerificationEmail } = api.auth.resendVerificationEmail.useMutation();
  const { mutateAsync: verifyEmailAddress } = api.auth.verifyEmail.useMutation();
  const { mutateAsync: signIn } = api.auth.signIn.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!signUp) return;

    try {
      if (!userId) {
        alert("User ID is missing. Please try again.");
        setLoading(false);
        return;
      }
      const code = new FormData(e.currentTarget).get("code") as string;
      const result = await verifyEmailAddress({ userId, code });
      if (email && password) {
        await signIn({ email, password });
        router.push("/onboarding");
      }
    } catch (error) {
      const { clerkErrorType, errorMessage } = getExpectedClerkError(error, [
        ClerkErrorType.IncorrectOTPCode,
        ClerkErrorType.VerificationFailedTooManyAttempts,
      ]);
      if (!clerkErrorType) {
        setError(errorMessage);
        setLoading(false);
        return;
      }
      switch (clerkErrorType) {
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
      <Flex direction="column" gap="6" align="center">
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

          <Flex direction="column" gap="6" width="100%">
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
              <Button className="w-full" size="3" onClick={() => resendVerificationEmail({ userId: "" })}>
                Resend
              </Button>
            )}
          </Flex>
          <Flex width="100%" justify="center">
            <Text size="2" color="gray" className="flex gap-1">
              Didn’t receive a code?{" "}
              <Flex gap="1">
                <Link asChild size="2" underline={"hover"} color={baseAccessColor}>
                  <NextLink href="/sign-up">Resend</NextLink>
                </Link>
                or
                <Link asChild size="2" underline={"hover"} color={baseAccessColor}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setStage("email");
                    }}>
                    Change email
                  </div>
                </Link>
              </Flex>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
}

function PersonalDetails() {
  return null;
}
