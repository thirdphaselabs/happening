"use client";

import { createContext, useContext, type ReactNode, useState } from "react";
import { ClerkErrorType } from "~/utils/error";
import { invariant } from "~/utils/helpers";

type SignInState = {
  stage: "email" | "password" | "forgot-password" | "reset-password";
  otp: string | null;
  email?: string;
  setEmail: (email: string) => void;
  setStage: (stage: SignInState["stage"]) => void;
  errorCode: ClerkErrorType.EmailAlreadyAssociated | null;
  clearError: () => void;
};

const SignInContext = createContext<SignInState | undefined>(undefined);

type SignInContextProviderProps = {
  children: ReactNode;
  errorCode: ClerkErrorType.EmailAlreadyAssociated | null;
};

export function SignInContextProvider({ children, errorCode: intialErrorCode,  }: SignInContextProviderProps) {
  const [stage, setStage] = useState<SignInState["stage"]>("email");
  const [email, setEmail] = useState<SignInState["email"]>();
  const [errorCode, setErrorCode] = useState<ClerkErrorType.EmailAlreadyAssociated | null>(intialErrorCode);
  const [otp, setOtp] = useState<SignInState["otp"]>(null);

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
