"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuthRefresh } from "~/app/_hooks/useAuthRefresh";
import { api } from "~/trpc/provider";
import { Attending, Session } from "~/trpc/types";
import { invariant } from "~/utils/helpers";
import { faker } from "@faker-js/faker";
import { BadgeProps } from "@radix-ui/themes";

type FakeUser = {
  name: string;
  email: string;
  color: BadgeProps["color"];
  status: "pending" | "approved" | "rejected";
  image: string;
};

type UserState = {
  user: Session["user"];
  profile: Session["profile"];
  attending: Attending;
  fakeUserOne: FakeUser[];
  fakeUserTwo: FakeUser[];
  refresh: (args: RefreshOptions) => Promise<void>;
  updateFakeUserStatus: (
    listType: "one" | "two",
    email: string,
    newStatus: "pending" | "approved" | "rejected",
  ) => void;
};

const UserContext = createContext<UserState | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
  session: Session;
  attending: Attending;
  fakeUserOne: FakeUser[];
  fakeUserTwo: FakeUser[];
};

type RefreshOptions = {
  shouldFetchUserInfo?: boolean;
};

export function OptionalUserContextProvider({
  children,
  session: serverSession,
  attending,
  fakeUserOne,
  fakeUserTwo,
}: Partial<UserContextProviderProps>) {
  if (!serverSession || !attending) {
    return <>{children}</>;
  }

  return (
    <UserContextProvider
      attending={attending}
      session={serverSession}
      fakeUserOne={fakeUserOne ?? []}
      fakeUserTwo={fakeUserTwo ?? []}>
      {children}
    </UserContextProvider>
  );
}

export function UserContextProvider({
  children,
  session: serverSession,
  attending: initialAttending,
  fakeUserOne,
  fakeUserTwo,
}: UserContextProviderProps) {
  const [session, setSession] = useState<Session>(serverSession);
  const [localFakeUserOne, setLocalFakeUserOne] = useState(fakeUserOne);
  const [localFakeUserTwo, setLocalFakeUserTwo] = useState(fakeUserTwo);
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

  const updateFakeUserStatus = useCallback(
    (listType: "one" | "two", email: string, newStatus: "pending" | "approved" | "rejected") => {
      const updateFunction = (prevUsers: FakeUser[]) =>
        prevUsers.map((user) => (user.email === email ? { ...user, status: newStatus } : user));

      if (listType === "one") {
        setLocalFakeUserOne(updateFunction);
      } else {
        setLocalFakeUserTwo(updateFunction);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      user: session.user,
      profile: session.profile,
      attending: attending ?? [],
      refresh,
      fakeUserOne: localFakeUserOne,
      fakeUserTwo: localFakeUserTwo,
      updateFakeUserStatus,
    }),
    [session, attending, localFakeUserOne, localFakeUserTwo, updateFakeUserStatus],
  );

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
