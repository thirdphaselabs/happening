"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { invariant } from "~/utils/helpers";

type InviteState = {
  invites: {
    one?: {
      email: string;
    };
    two?: {
      email: string;
    };
    three?: {
      email: string;
    };
  };
  addInvite: (key: "one" | "two" | "three", email?: string) => void;
  removeInvite: (key: "one" | "two" | "three") => void;
};

const InviteContext = createContext<InviteState | undefined>(undefined);

type InviteContextProviderProps = {
  children: ReactNode;
};

export function InviteContextProvider({ children }: InviteContextProviderProps) {
  const [invites, setInvites] = useState<InviteState["invites"]>({
    one: undefined,
    two: undefined,
    three: undefined,
  });

  return (
    <InviteContext.Provider
      value={{
        invites,
        addInvite: (key, email) => {
          setInvites((prev) => ({
            ...prev,
            [key]: {
              email,
            },
          }));
        },
        removeInvite: (key) => {
          setInvites((prev) => ({
            ...prev,
            [key]: undefined,
          }));
        },
      }}>
      {children}
    </InviteContext.Provider>
  );
}

export function useInviteContext() {
  const contextValue = useContext(InviteContext);

  invariant(contextValue, "Missing InviteContextProvider");

  return contextValue;
}
