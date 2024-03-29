import { TRPCError } from "@trpc/server";
import { z } from "zod";

export function assertError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new Error(`Received unknown error type: ${typeof error}.`);
  }
}

export function getTRPCError(error: unknown): TRPCError | null {
  const errorObj = error as { name?: string; data: unknown };
  if (errorObj?.name === "TRPCClientError") {
    return JSON.parse(JSON.stringify(errorObj.data as TRPCError)) as TRPCError;
  }
  return null;
}

export enum ClerkErrorType {
  EmailAlreadyAssociated = "EmailAlreadyAssociated",
  PasswordTooShort = "PasswordTooShort",
  IncorrectPassword = "IncorrectPassword",
  AccountNotFound = "AccountNotFound",
  IncorrectOTPCode = "IncorrectOTPCode",
  VerificationFailedTooManyAttempts = "VerificationFailedTooManyAttempts",
  PasswordFoundInBreach = "PasswordFoundInBreach",
  VerificationExpired = "VerificationExpired",
}

export const clerkErrorTypeToCode: Record<ClerkErrorType, string> = {
  [ClerkErrorType.EmailAlreadyAssociated]: "form_identifier_exists",
  [ClerkErrorType.PasswordTooShort]: "form_password_length_too_short",
  [ClerkErrorType.IncorrectPassword]: "form_password_incorrect",
  [ClerkErrorType.AccountNotFound]: "form_identifier_not_found",
  [ClerkErrorType.IncorrectOTPCode]: "form_code_incorrect",
  [ClerkErrorType.VerificationFailedTooManyAttempts]: "verification_failed",
  [ClerkErrorType.PasswordFoundInBreach]: "form_password_pwned",
  [ClerkErrorType.VerificationExpired]: "verification_expired",
};

const clerkErrorSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
      code: z.string(),
    }),
  ),
});
type ClerkError = z.infer<typeof clerkErrorSchema>;

function parseClerkError(error: unknown): ClerkError | null {
  try {
    console.log({ error });
    // @ts-ignore
    return clerkErrorSchema.parse({ errors: error.errors });
  } catch {
    return null;
  }
}

export function getExpectedClerkError(error: unknown, expected: ClerkErrorType[]): ClerkErrorType | null {
  const clerkError = parseClerkError(error);

  console.log({ clerkError });

  for (const type of expected) {
    console.log({ cCode: clerkError?.errors[0].code, t: clerkErrorTypeToCode[type] });
    if (clerkError?.errors[0].code === clerkErrorTypeToCode[type]) {
      return type;
    }
  }

  return null;
}
