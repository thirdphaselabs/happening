"use client";

import { createContext, useContext, type ReactNode, useState } from "react";
import { invariant } from "~/utils/helpers";

type SignUpState = {
  stage: "email" | "password" | "email-verification" | "personal-details";
  email: string | null;
  userId: string | null;
  password: string | null;
  ticket?: string;
  setEmail: (email: string) => void;
  setStage: (stage: SignUpState["stage"]) => void;
  setUserId: (userId: string) => void;
  setPassword: (password: string) => void;
};

const SignUpContext = createContext<SignUpState | undefined>(undefined);

type SignUpContextProviderProps = {
  children: ReactNode;
  userId: string | null;
  email: string | null;
  password: string | null;
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
  const [userId, setUserId] = useState<string | null>(null);
  const [password, setPassword] = useState<SignUpState["password"]>(null);

  return (
    <SignUpContext.Provider
      value={{
        stage,
        email,
        password,
        userId,
        ticket,
        setEmail: (email) => {
          setEmail(email);
        },
        setStage: (stage) => {
          setStage(stage);
        },
        setUserId: (userId) => {
          setUserId(userId);
        },
        setPassword: (password) => {
          setPassword(password);
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
