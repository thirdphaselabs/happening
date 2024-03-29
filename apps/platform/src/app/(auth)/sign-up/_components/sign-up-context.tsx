"use client";

import { createContext, useContext, type ReactNode, useState } from "react";
import { invariant } from "~/utils/helpers";

type SignUpState = {
  stage: "email" | "password" | "email-verification";
  email: string | null;
  ticket?: string;
  setEmail: (email: string) => void;
  setStage: (stage: SignUpState["stage"]) => void;
};

const SignUpContext = createContext<SignUpState | undefined>(undefined);

type SignUpContextProviderProps = {
  children: ReactNode;
  email: string | null;
  isMissingPassword?: boolean;
  ticket?: string;
};

export function SignUpContextProvider({
  children,
  email: initialEmail,
  isMissingPassword,
  ticket,
}: SignUpContextProviderProps) {
  const calculateStage = () => {
    if (ticket) {
      return "password";
    }

    if (isMissingPassword && initialEmail) {
      return "password";
    }

    if (initialEmail) {
      return "email-verification";
    }

    return "email";
  };
  const [stage, setStage] = useState<SignUpState["stage"]>(() => calculateStage());
  const [email, setEmail] = useState<SignUpState["email"]>(initialEmail);

  return (
    <SignUpContext.Provider
      value={{
        stage,
        email,
        ticket,
        setEmail: (email) => {
          setEmail(email);
        },
        setStage: (stage) => {
          setStage(stage);
        },
      }}>
      {children}
    </SignUpContext.Provider>
  );
}

export function useSignUpContext() {
  const contextValue = useContext(SignUpContext);

  invariant(contextValue, "Missing SignUpContextProvider");

  return contextValue;
}
