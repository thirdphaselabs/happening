"use client";

import { useUser } from "@clerk/nextjs";
import { Container, Flex, Heading } from "@radix-ui/themes";
import { Button } from "@plaventi/ui";
import { api } from "~/trpc/provider";

export default function Developer() {
  const { mutateAsync, isLoading, error, isSuccess } = api.onboarding.resetOnboarding.useMutation();
  const { user } = useUser();

  return (
    <Container py="9">
      <Flex direction="column" gap="4">
        <Heading>Developer</Heading>

        <Flex>
          <Button
            onClick={async () => {
              await mutateAsync();
              await user?.reload();
            }}
            error={{
              isError: !!error,
              errorText: error?.message ?? undefined,
            }}
            loading={{
              isLoading,
              loadingText: "Resetting onboarding",
            }}
            success={{
              isSuccess,
              successText: "Onboarding reset success",
            }}>
            Reset onboarding
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
