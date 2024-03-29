import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/provider";
import { assertError } from "~/utils/error";
import { computeOnboardingPath } from "~/utils/helpers";

export function useCompleteCurrentOnboardingStep() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = api.onboarding.completeCurrentOnboardingStep.useMutation();
  const { user } = useUser();
  const router = useRouter();

  const completeCurrentOnboardingStep = async () => {
    setIsLoading(true);
    try {
      const data = await mutateAsync();
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
      completeCurrentOnboardingStep,
      error: null,
    } as const;
  }

  if (error) {
    return {
      error,
      isLoading: false,
      completeCurrentOnboardingStep,
    } as const;
  }

  return {
    isLoading,
    completeCurrentOnboardingStep,
    error: null,
  } as const;
}
