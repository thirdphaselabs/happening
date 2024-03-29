"use client";

import { useUser } from "@clerk/nextjs";
import { Flex, Heading } from "@radix-ui/themes";
import { Button } from "@plaventi/ui";
import { toast } from "sonner";
import { NotificationCallout } from "~/app/_components/Notification";
import { useCompleteOnboarding } from "../_hooks/use-complete-onboarding";

export default function OnboardingComplete() {
  const { completeOnboarding, isLoading, error } = useCompleteOnboarding();
  const { user, isLoaded } = useUser();

  const handleCompleteOnboarding = async () => {
    if (!user) {
      toast.error(<NotificationCallout type="error" message="Still loading" />);
      return;
    }

    const organisations = user.organizationMemberships.map((membership) => {
      return {
        orgId: membership.organization.id,
        orgMembershipId: membership.id,
      };
    });

    await completeOnboarding({ organisations });
  };

  return (
    <Flex direction="column" width="100%" justify="center" align="center">
      <Heading size="6">Start feeling in control of your team's engagement</Heading>

      <Button
        loading={{
          isLoading: isLoading || !isLoaded,
          loadingText: "Loading your dashboard",
        }}
        error={{
          errorText: error ?? undefined,
          isError: !!error,
        }}
        onClick={handleCompleteOnboarding}>
        Get started
      </Button>
    </Flex>
  );
}
