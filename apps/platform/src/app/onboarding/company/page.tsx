"use client";

import { Flex, Text, TextField } from "@radix-ui/themes";
import { Button } from "@plaventi/ui";
import { useState } from "react";
import { toast } from "sonner";
import { assertError } from "~/utils/error";
import { useCreateOrganization } from "../_hooks/use-create-organisation";

export default function OnboardingCompany() {
  const [formError, setFormError] = useState<string | null>(null);
  const { createCompany, isLoading, error } = useCreateOrganization();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const companyName = formData.get("companyName") as string;

    if (!companyName) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createCompany({
        companyName,
      });
    } catch (error) {
      assertError(error);
      setFormError(error.message);
    }
  };

  return (
    <Flex direction="column" className="h-fit w-[480px] p-8">
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex direction="column" gap="4" width="100%">
          <label>
            <Text as="div" size="2" mb="1">
              Company name
            </Text>

            <TextField.Root
              size="3"
              placeholder="Enter your company name"
              name="companyName"
              type="text"
              required
            />
          </label>

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
    </Flex>
  );
}
