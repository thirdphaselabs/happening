"use client";

import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "~/trpc/provider";

export function SyncActiveOrganization({ activeOrgCookie }: { activeOrgCookie: string | undefined }) {
  const { data, isLoading } = api.auth.getActiveOrganization.useQuery(undefined, {
    enabled: !activeOrgCookie,
    retry: 0,
  });
  const { setActive, isLoaded } = useOrganizationList();

  useEffect(() => {
    console.log("SyncActiveOrganization", { activeOrgCookie, data, isLoading, isLoaded });
    if (activeOrgCookie) return;
    if (!isLoaded) return;
    if (isLoading) return;
    if (!data) return;

    console.log("SyncActiveOrganization", { organization: data.clerkOrganisationId });
    void setActive({ organization: data.clerkOrganisationId });
  }, [data, isLoading, isLoaded]);

  useEffect(() => {
    if (!activeOrgCookie) return;
    if (!isLoaded) return;

    void setActive({ organization: activeOrgCookie });
  }, [isLoaded, activeOrgCookie]);

  return null;
}
