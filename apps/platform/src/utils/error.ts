import { TRPCError } from "@trpc/server";
import { z } from "zod";

export function assertError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new Error(`Received unknown error type: ${typeof error}.`);
  }
}

export function getTRPCError(error: unknown): { code: string; message: string } | null {
  console.log("error", error);
  const errorObj = error as { shape: { code: string; message: string } };
  console.log("errorObj", JSON.stringify(errorObj, null, 2));
  if ("shape" in errorObj) {
    return {
      code: errorObj.shape.code,
      message: errorObj.shape.message,
    };
  }
  return null;
}

export enum AuthErrorType {
  EmailAlreadyAssociated = "EmailAlreadyAssociated",
  PasswordTooShort = "PasswordTooShort",
  InvalidCredentials = "InvalidCredentials",
  AccountNotFound = "AccountNotFound",
  IncorrectOTPCode = "IncorrectOTPCode",
  VerificationFailedTooManyAttempts = "VerificationFailedTooManyAttempts",
  PasswordFoundInBreach = "PasswordFoundInBreach",
  VerificationExpired = "VerificationExpired",
  ToManyRequests = "ToManyRequests",
}

export const clerkErrorTypeToCode: Record<AuthErrorType, string> = {
  [AuthErrorType.EmailAlreadyAssociated]: "form_identifier_exists",
  [AuthErrorType.PasswordTooShort]: "form_password_length_too_short",
  [AuthErrorType.InvalidCredentials]: "invalid_credentials",
  [AuthErrorType.AccountNotFound]: "form_identifier_not_found",
  [AuthErrorType.IncorrectOTPCode]: "form_code_incorrect",
  [AuthErrorType.VerificationFailedTooManyAttempts]: "verification_failed",
  [AuthErrorType.PasswordFoundInBreach]: "form_password_pwned",
  [AuthErrorType.VerificationExpired]: "verification_expired",
  [AuthErrorType.ToManyRequests]: "too_many_requests",
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
    // @ts-ignore
    return clerkErrorSchema.parse({ errors: error.errors });
  } catch {
    return null;
  }
}

export function getExpectedAuthenticationError(
  error: unknown,
  expected: AuthErrorType[],
): { clerkErrorType: AuthErrorType; errorMessage: null } | { clerkErrorType: null; errorMessage: string } {
  const trpcError = getTRPCError(error);

  console.log("trpcError", trpcError);

  for (const type of expected) {
    if (trpcError?.message === clerkErrorTypeToCode[type]) {
      return { clerkErrorType: type, errorMessage: null };
    }
  }

  return { clerkErrorType: null, errorMessage: trpcError?.message ?? "An error occurred." };
}
