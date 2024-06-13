"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Session } from "~/trpc/types";
import { invariant } from "~/utils/helpers";

type UserState = {
  user: Session["user"];
  profile: Session["profile"];
  refresh: (args: RefreshOptions) => Promise<void>;
};

const UserContext = createContext<UserState | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
  session: Session;
};

type RefreshOptions = {
  shouldFetchUserInfo?: boolean;
};

export function UserContextProvider({ children, session: serverSession }: UserContextProviderProps) {
  const [session, setSession] = useState<Session>(serverSession);

  const refresh = useCallback(async ({ shouldFetchUserInfo = false }: RefreshOptions) => {
    const url = shouldFetchUserInfo
      ? "http://localhost:3002/api/auth/refresh?fetchUserInfo=true"
      : "http://localhost:3002/api/auth/refresh";

    const res = await fetch(url, {
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
