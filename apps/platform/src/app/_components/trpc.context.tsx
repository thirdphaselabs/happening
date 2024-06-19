"use client";

import { PlaventiSession } from "@plaventi/server/src/modules/auth/auth.controller";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { invariant } from "~/utils/helpers";

type TRPCState = {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
};

const TRPCContext = createContext<TRPCState | undefined>(undefined);

type TRPCContextProviderProps = {
  children: ReactNode;
  accessToken: string | null;
};

export function TRPCContextProvider({ children, accessToken: initialAccessToken }: TRPCContextProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(initialAccessToken);

  const value = useMemo(
    () => ({ accessToken, setAccessToken: (val: string) => setAccessToken(val) }),
    [accessToken],
  );

  return <TRPCContext.Provider value={value}>{children}</TRPCContext.Provider>;
}

export function useTRPCContext() {
  const contextValue = useContext(TRPCContext);

  invariant(contextValue, "Missing TRPCContextProvider");

  return contextValue;
}
