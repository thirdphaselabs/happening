"use client";

import { Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { Button, TextFieldInput, TextFieldLabel, TextFieldRoot } from "@plaventi/ui";
import { useState } from "react";
import { toast } from "sonner";
import { assertError } from "~/utils/error";
import { useCreateOrganization } from "../_hooks/use-create-organisation";
import { OnboardingSectionHeader } from "../_components/OnboardingSectionHeader";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormMessage } from "~/components/ui/form";
import { api } from "~/trpc/provider";
import { useDebounce } from "../../../_hooks/use-debounce";

const domainRegex = /^[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,}$/;
const noProtocolRegex = /^(?!https?:\/\/).+$/;

export default function OnboardingCompany() {
  const [formError, setFormError] = useState<string | null>(null);
  const { createCompany, isLoading, error } = useCreateOrganization();
  const router = useRouter();
  const [domain, setDomain] = useState<string | null>(null);

  const { data: isAssociated, isLoading: isAssociatedLoading } = api.team.isDomainAssociatedWithTeam.useQuery(
    {
      domain: domain ?? "",
    },
    {
      enabled: !!domain && domainRegex.test(domain),
    },
  );

  const schema = z.object({
    teamName: z.string().min(2).max(63),
    bio: z.string().min(2).max(255),
    domain: z
      .string()
      .min(2, "Domain must be at least 2 characters")
      .max(63, "At most 63 characters")
      .regex(noProtocolRegex, { message: "Omit the protocol (http:// or https://)" })
      .regex(domainRegex, { message: "Invalid domain format" })
      .refine(
        async (domain) => {
          return !isAssociated?.isAssociated;
        },
        { message: "Domain is already associated with a team" },
      ),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log("values", values);

    await createCompany({
      name: values.teamName,
      domain: values.domain,
    });
  };

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
      console.log("teamName", teamName);
      const create = await createCompany({
        name: teamName,
        domain,
      });
      console.log("teamName", teamName);

      const justDomain = new URL(domain).hostname;

      // router.push(`/onboarding/invite?domain=${justDomain}`);
    } catch (error) {
      console.error(error);
      assertError(error);
      setFormError(error.message);
    }
  };

  return (
    <OnboardingSectionHeader
      title="Create your team"
      description="These details will form your public profile.">
      <FormProvider {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3" width="100%">
            <Flex direction="column" gap="2" width="100%">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <TextFieldRoot>
                    <TextFieldLabel>Team name</TextFieldLabel>

                    <TextField.Root size="3" placeholder="e.g. 9-5 Events" {...field} />
                    <FormMessage />
                  </TextFieldRoot>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <TextFieldRoot>
                    <TextFieldLabel>Bio</TextFieldLabel>

                    <TextArea
                      size="3"
                      placeholder="e.g. A team of event managers that specialize in corporate events."
                      {...field}
                    />
                    <FormMessage />
                  </TextFieldRoot>
                )}
              />

              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <TextFieldRoot>
                    <TextFieldLabel>Company domain (URL)</TextFieldLabel>

                    <TextField.Root
                      size="3"
                      placeholder="e.g. https://ninetofiveevents.com"
                      {...field}
                      onChange={(e) => {
                        setDomain(e.target.value);
                        field.onChange(e);
                      }}
                    />
                    <FormMessage />
                  </TextFieldRoot>
                )}
              />
            </Flex>

            <Flex direction="column" gap="3" width="100%">
              <Button
                size="3"
                loading={{
                  isLoading: isLoading,
                }}
                disabled={isLoading || isAssociatedLoading}
                error={{
                  errorText: error ?? undefined,
                  isError: !!formError || !!error,
                }}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </OnboardingSectionHeader>
  );
}
