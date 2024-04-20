"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Checkbox, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { Button, TextFieldInput } from "@plaventi/ui";
import { useState } from "react";
import { toast } from "sonner";
import { assertError } from "~/utils/error";
import { useCompletePersonalDetails } from "../_hooks/use-complete-personal-details";
import { EventsManagerBadge } from "~/app/_components/EventsManagerBadge";

export default function OnboardingProfile() {
  const [formError, setFormError] = useState<string | null>(null);
  const { completePersonalDetails, isLoading, error } = useCompletePersonalDetails();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (!firstName || !lastName) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await completePersonalDetails({
        firstName,
        lastName,
      });
    } catch (error) {
      assertError(error);
      setFormError(error.message);
    }
  };

  return (
    <Flex direction="column" align="center" width="100%" gap="6">
      <Flex align="center" justify="center" mb="4">
        <EventsManagerBadge />
      </Flex>
      <Flex direction="column" gap="2" align="center">
        <Heading size="7" mb="0">
          Tell us about yourself
        </Heading>
        <Text size="2" color="gray" weight="light">
          Enter your personal information.
        </Text>
      </Flex>
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex direction="column" gap="6" width="100%">
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

            <Text as="label" size="2" color="gray">
              <Flex gap="2">
                <Checkbox name="disclaimer" required />
                By checking this box you agree to the Terms & Conditions and Privacy Policy set out by
                Plaventi.
              </Flex>
            </Text>
          </Flex>

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
