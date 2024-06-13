import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "~/modules/auth/user.context";
import { api } from "~/trpc/provider";
import { assertError } from "~/utils/error";
import { computeOnboardingPath } from "~/utils/helpers";

export function useCreateOrganization() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = api.onboarding.createOrganization.useMutation();
  const { user, refresh } = useUser();

  const router = useRouter();

  const createCompany = async ({ name, domain }: { name: string; domain: string }) => {
    setIsLoading(true);

    try {
      console.log("name", name);
      const { nextStep } = await mutateAsync({
        name,
        domain,
      });
      await refresh({});
      router.push(`${computeOnboardingPath(nextStep)}?domain=${domain}`);
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
