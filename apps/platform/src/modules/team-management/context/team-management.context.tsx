"use client";

import { PlaventiSession } from "@plaventi/server/src/modules/auth/auth.controller";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { invariant } from "~/utils/helpers";

type TeamManagementState = {
  team: NonNullable<PlaventiSession["profile"]["team"]>;
};

const TeamManagementContext = createContext<TeamManagementState | undefined>(undefined);

type TeamManagementContextProviderProps = {
  children: ReactNode;
  team: NonNullable<PlaventiSession["profile"]["team"]>;
};

export function TeamManagementContextProvider({ children, team }: TeamManagementContextProviderProps) {
  const value = useMemo(() => ({ team }), [team]);

  return <TeamManagementContext.Provider value={value}>{children}</TeamManagementContext.Provider>;
}

export function useTeamManagement() {
  const contextValue = useContext(TeamManagementContext);

  invariant(contextValue, "Missing EventDetailsProvider");

  return contextValue;
}
