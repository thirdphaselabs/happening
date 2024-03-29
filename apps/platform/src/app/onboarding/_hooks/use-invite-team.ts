import { useOrganizationList, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/provider";
import { assertError } from "~/utils/error";
import { computeOnboardingPath } from "~/utils/helpers";

export function useInviteTeam() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = api.onboarding.inviteTeamMembers.useMutation();
  const { user } = useUser();
  const router = useRouter();

  const inviteTeam = async (args: { invites: { email: string }[] }) => {
    setIsLoading(true);

    try {
      const { nextStep } = await mutateAsync({
        invites: args.invites,
      });
      await user?.reload();
      router.push(computeOnboardingPath(nextStep));
    } catch (error) {
      assertError(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return {
      isLoading: true,
      inviteTeam,
      error: null,
    } as const;
  }

  if (error) {
    return {
      error,
      isLoading: false,
      inviteTeam,
    } as const;
  }

  return {
    isLoading,
    inviteTeam,
    error: null,
  } as const;
}
