"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Select, Text } from "@radix-ui/themes";
import { Button, TextFieldInput } from "@plaventi/ui";
import { useState } from "react";
import { toast } from "sonner";
import { assertError } from "~/utils/error";
import { useCompletePersonalDetails } from "../_hooks/use-complete-personal-details";

export default function OnboardingProfile() {
  const [formError, setFormError] = useState<string | null>(null);
  const { completePersonalDetails, isLoading, error } = useCompletePersonalDetails();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const role = formData.get("role") as string;

    if (!firstName || !lastName || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await completePersonalDetails({
        firstName,
        lastName,
        role,
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
              First name
            </Text>

            <TextFieldInput
              size="3"
              placeholder="Enter your first name"
              name="firstName"
              type="text"
              required
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1">
              Last name
            </Text>

            <TextFieldInput
              size="3"
              placeholder="Enter your last name"
              name="lastName"
              type="text"
              required
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1">
              What's your role?
            </Text>

            <Select.Root name="role" size="3" required>
              <Select.Trigger className="w-full" placeholder="Select your role" />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="hr">HR</Select.Item>
                  <Select.Item value="manager">Manager</Select.Item>
                  <Select.Item value="employee">Employee</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>

          <Flex direction="column" gap="3" width="100%">
            <Button
              size="3"
              loading={{
                isLoading,
              }}
              error={{
                errorText: formError ?? error ?? undefined,
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
