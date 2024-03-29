import { useOrganizationList, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/provider";
import { assertError } from "~/utils/error";
import { computeOnboardingPath } from "~/utils/helpers";

export function useCreateOrganization() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = api.onboarding.createOrganization.useMutation();
  const { user } = useUser();
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const router = useRouter();

  const createCompany = async (args: { companyName: string }) => {
    setIsLoading(true);
    if (!isLoaded || !userMemberships.data) {
      setError("Please wait");
      setIsLoading(false);
      return;
    }

    console.log(userMemberships.data);

    if (userMemberships.data.length > 0) {
      setError("You are already part of a organization");
      setIsLoading(false);
      return;
    }

    try {
      const { nextStep } = await mutateAsync({
        name: args.companyName,
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
      createCompany,
      error: null,
    } as const;
  }

  if (error) {
    return {
      error,
      isLoading: false,
      createCompany,
    } as const;
  }

  return {
    isLoading,
    createCompany,
    error: null,
  } as const;
}
