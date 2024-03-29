import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/provider";
import { assertError } from "~/utils/error";
import { computeOnboardingStepFromPath } from "~/utils/helpers";

export function useBeginOnboarding() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = api.onboarding.beginOnboarding.useMutation();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const utils = api.useUtils();

  const beginOnboarding = async () => {
    setIsLoading(true);
    if (!user) {
      setError("User not found");
      setIsLoading(false);
      return;
    }
    try {
      const organisations = user.organizationMemberships.map((membership) => {
        return {
          orgId: membership.organization.id,
          orgMembershipId: membership.id,
        };
      });
      const { nextStep } = await mutateAsync({ organisations });
      await user.reload();
      await utils.auth.getRole.invalidate();
      router.push(computeOnboardingStepFromPath(nextStep));
    } catch (error) {
      assertError(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading || !isLoaded) {
    return {
      isLoading: true,
      beginOnboarding,
      error: null,
    } as const;
  }

  if (error) {
    return {
      error,
      isLoading: false,
      beginOnboarding,
    } as const;
  }

  return {
    isLoading,
    beginOnboarding,
    error: null,
  } as const;
}
