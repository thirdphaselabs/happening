"use client";

import { createContext, useContext, type ReactNode, useState } from "react";
import { AuthErrorType } from "~/utils/error";
import { invariant } from "~/utils/helpers";

type SignInState = {
  stage: "email" | "password" | "forgot-password" | "reset-password";
  otp: string | null;
  email?: string;
  setEmail: (email: string) => void;
  setStage: (stage: SignInState["stage"]) => void;
  errorCode: AuthErrorType.EmailAlreadyAssociated | null;
  clearError: () => void;
};

const SignInContext = createContext<SignInState | undefined>(undefined);

type SignInContextProviderProps = {
  children: ReactNode;
  errorCode: AuthErrorType.EmailAlreadyAssociated | null;
  email?: string;
};

export function SignInContextProvider({
  children,
  errorCode: initialErrorCode,
  email: initialEmail,
}: SignInContextProviderProps) {
  const [stage, setStage] = useState<SignInState["stage"]>(initialEmail ? "password" : "email");
  const [email, setEmail] = useState<SignInState["email"]>(initialEmail);
  const [errorCode, setErrorCode] = useState<AuthErrorType.EmailAlreadyAssociated | null>(initialErrorCode);

  return (
    <SignInContext.Provider
      value={{
        stage,
        email,
        setEmail: (email) => {
          setEmail(email);
        },
        setStage: (stage) => {
          setStage(stage);
        },
        errorCode,
        otp: null,
        clearError: () => {
          setErrorCode(null);
        },
      }}>
      {children}
    </SignInContext.Provider>
  );
}

export function useSignInContext() {
  const contextValue = useContext(SignInContext);

  invariant(contextValue, "Missing SignInContextProvider");

  return contextValue;
}
