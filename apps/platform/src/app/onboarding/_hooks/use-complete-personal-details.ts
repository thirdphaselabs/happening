import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/provider";
import { assertError } from "~/utils/error";
import { computeOnboardingPath } from "~/utils/helpers";

export function useCompletePersonalDetails() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = api.onboarding.completePersonalDetails.useMutation();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const completePersonalDetails = async ({
    firstName,
    lastName,
    role,
  }: {
    firstName: string;
    lastName: string;
    role: string;
  }) => {
    setIsLoading(true);

    if (!isLoaded || !user) {
      setError("Please wait");
      setIsLoading(false);
      return;
    }
    try {
      const orgMemberships = await user.getOrganizationMemberships();
      const organisations = orgMemberships.map((membership) => ({
        orgId: membership.organization.id,
        orgMembershipId: membership.id,
      }));
      const data = await mutateAsync({ firstName, lastName, role, organisations });
      await user?.reload();
      router.push(computeOnboardingPath(data.nextStep));
    } catch (error) {
      assertError(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return {
      isLoading: true,
      completePersonalDetails,
      error: null,
    } as const;
  }

  if (error) {
    return {
      error,
      isLoading: false,
      completePersonalDetails,
    } as const;
  }

  return {
    isLoading,
    completePersonalDetails,
    error: null,
  } as const;
}
