import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "~/modules/auth/user.context";
import { api } from "~/trpc/provider";
import { assertError } from "~/utils/error";
import { computeOnboardingPath } from "~/utils/helpers";

export function useCompletePersonalDetails() {
  const { user, refresh } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = api.onboarding.completePersonalDetails.useMutation();
  const router = useRouter();

  const completePersonalDetails = async ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => {
    setIsLoading(true);

    try {
      const data = await mutateAsync({ firstName, lastName });
      await refresh({});
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
