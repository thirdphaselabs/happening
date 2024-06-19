"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useAuthRefresh } from "~/app/_hooks/useAuthRefresh";
import { api } from "~/trpc/provider";
import { Attending, Session } from "~/trpc/types";
import { invariant } from "~/utils/helpers";

type UserState = {
  user: Session["user"];
  profile: Session["profile"];
  attending: Attending;
  refresh: (args: RefreshOptions) => Promise<void>;
};

const UserContext = createContext<UserState | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
  session: Session;
  attending: Attending;
};

type RefreshOptions = {
  shouldFetchUserInfo?: boolean;
};

export function OptionalUserContextProvider({
  children,
  session: serverSession,
  attending,
}: Partial<UserContextProviderProps>) {
  if (!serverSession || !attending) {
    return <>{children}</>;
  }

  return (
    <UserContextProvider attending={attending} session={serverSession}>
      {children}
    </UserContextProvider>
  );
}

export function UserContextProvider({
  children,
  session: serverSession,
  attending: initialAttending,
}: UserContextProviderProps) {
  const [session, setSession] = useState<Session>(serverSession);
  const { authRefresh } = useAuthRefresh();

  const { data: attending } = api.profile.attending.useQuery(undefined, {
    initialData: initialAttending,
  });

  const refresh = useCallback(async ({ shouldFetchUserInfo = false }: RefreshOptions) => {
    const res = await authRefresh({ shouldFetchUserInfo });
    if (!res.sessionData) {
      return;
    }
    setSession(res.sessionData);
  }, []);

  const value = useMemo(
    () => ({ user: session.user, profile: session.profile, attending: attending ?? [], refresh }),
    [session, attending],
  );

  console.log("UserContextProvider", value);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const contextValue = useContext(UserContext);

  invariant(contextValue, "Missing UserContextProvider");

  return contextValue;
}

export function useOptionalUser() {
  const contextValue = useContext(UserContext);

  if (!contextValue) {
    return null;
  }

  return contextValue;
}
