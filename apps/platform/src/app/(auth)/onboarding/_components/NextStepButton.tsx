import { Button } from "@plaventi/ui";
import { useCompleteCurrentOnboardingStep } from "../_hooks/use-complete-current-onboarding-step";

export function NextStepButton({ children = "Next" }: { children?: React.ReactNode }) {
  const { completeCurrentOnboardingStep, isLoading, error } = useCompleteCurrentOnboardingStep();

  return (
    <Button
      size="3"
      className="w-full"
      loading={{
        isLoading,
        loadingText: "Completing step",
      }}
      error={{
        errorText: error ?? undefined,
        isError: !!error,
      }}
      onClick={async () => {
        await completeCurrentOnboardingStep();
      }}>
      {children}
    </Button>
  );
}
