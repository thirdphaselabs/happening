"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Session } from "~/trpc/types";
import { invariant } from "~/utils/helpers";

type UserState = {
  user: Session["user"];
  profile: Session["profile"];
  refresh: () => Promise<void>;
};

const UserContext = createContext<UserState | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
  session: Session;
};

export function UserContextProvider({ children, session: serverSession }: UserContextProviderProps) {
  const [session, setSession] = useState<Session>(serverSession);

  const refresh = useCallback(async () => {
    const res = await fetch("http://localhost:3002/api/auth/refresh", {
      credentials: "include",
    });
    const newSession = await res.json();
    setSession(newSession);
  }, []);

  const value = useMemo(() => ({ user: session.user, profile: session.profile, refresh }), [session]);

  console.log("UserContextProvider", value);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const contextValue = useContext(UserContext);

  invariant(contextValue, "Missing UserContextProvider");

  return contextValue;
}
