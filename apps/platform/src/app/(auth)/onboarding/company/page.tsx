"use client";

import { Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { Button, TextFieldInput, TextFieldLabel, TextFieldRoot } from "@plaventi/ui";
import { useState } from "react";
import { toast } from "sonner";
import { assertError } from "~/utils/error";
import { useCreateOrganization } from "../_hooks/use-create-organisation";
import { OnboardingSectionHeader } from "../_components/OnboardingSectionHeader";
import { useRouter } from "next/navigation";

export default function OnboardingCompany() {
  const [formError, setFormError] = useState<string | null>(null);
  const { createCompany, isLoading, error } = useCreateOrganization();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const teamName = formData.get("teamName") as string;
    const bio = formData.get("bio") as string;
    const domain = formData.get("domain") as string;

    if (!teamName || !bio || !domain) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createCompany({
        name: teamName,
        domain,
      });

      const justDomain = new URL(domain).hostname;

      router.push(`/onboarding/invite?domain=${justDomain}`);
    } catch (error) {
      assertError(error);
      setFormError(error.message);
    }
  };

  return (
    <OnboardingSectionHeader
      title="Create your team"
      description="These details will form your public profile.">
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex direction="column" gap="6" width="100%">
          <Flex direction="column" gap="4" width="100%">
            <TextFieldRoot>
              <TextFieldLabel>Team name</TextFieldLabel>

              <TextField.Root size="3" placeholder="e.g. 9-5 Events" name="teamName" type="text" required />
            </TextFieldRoot>

            <TextFieldRoot>
              <TextFieldLabel>Bio</TextFieldLabel>

              <TextArea
                size="3"
                placeholder="e.g. A team of event managers that specialize in corporate events."
                name="bio"
                rows={3}
                required
              />
            </TextFieldRoot>

            <TextFieldRoot>
              <TextFieldLabel>Company domain (URL)</TextFieldLabel>

              <TextField.Root
                size="3"
                placeholder="e.g. https://ninetofiveevents.com"
                name="domain"
                type="url"
                required
              />
            </TextFieldRoot>
          </Flex>

          <Flex direction="column" gap="3" width="100%">
            <Button
              size="3"
              loading={{
                isLoading: isLoading,
              }}
              error={{
                errorText: error ?? undefined,
                isError: !!formError || !!error,
              }}>
              Continue
            </Button>
          </Flex>
        </Flex>
      </form>
    </OnboardingSectionHeader>
  );
}
