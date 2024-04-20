import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/provider";
import { assertError } from "~/utils/error";

export function useCompleteOnboarding() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = api.onboarding.completeOnboarding.useMutation();
  const { user } = useUser();
  const router = useRouter();

  const completeOnboarding = async (args: {
    organisations: { orgId: string; orgMembershipId: string }[];
  }) => {
    setIsLoading(true);
    try {
      await mutateAsync(args);
      await user?.reload();
      router.push("/");
    } catch (error) {
      assertError(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return {
      isLoading: true,
      completeOnboarding,
      error: null,
    } as const;
  }

  if (error) {
    return {
      error,
      isLoading: false,
      completeOnboarding,
    } as const;
  }

  return {
    isLoading,
    completeOnboarding,
    error: null,
  } as const;
}
