"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TicketIcon } from "@plaventi/ui";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog } from "~/components/ui/dialog";
import { FormProvider } from "~/components/ui/form";
import { api } from "~/trpc/provider";

export function LinkStripeAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const schema = z.object({});

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  // console.log({ formErrors: form.formState.errors });
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: createAccount } = api.paymentAccount.createAccount.useMutation();
  const { mutateAsync: linkAccount } = api.paymentAccount.linkAccount.useMutation();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError(null);

    const account = await createAccount();

    if (!account) {
      return setError("Failed to create account");
    }

    const linkUrl = await linkAccount({ account });

    if (!linkUrl) {
      return setError("Failed to link account");
    }

    window.location.href = linkUrl;

    setIsOpen(false);
    setTimeout(() => {
      setError(null);
    }, 1000);
  };

  return (
    <Dialog.Root
      onOpenChange={(val) => {
        if (!val) {
          setTimeout(() => {
            form.reset();
          }, 1000);
        }
        return setIsOpen(val);
      }}
      open={isOpen}>
      <Dialog.Trigger>
        <Button color="gray" size="3" onClick={() => setIsOpen(true)} highContrast>
          Get Started
          <ArrowTopRightIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Container className="transition-height max-w-[350px] duration-500 ease-in-out">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Content className="px-5 py-4">
              <Flex gap="4" direction="column" mb="4">
                <Flex
                  className="h-[44px] w-[44px] items-center justify-center rounded-lg p-2"
                  style={{
                    backgroundColor: "var(--gray-a3)",
                  }}>
                  <TicketIcon />
                </Flex>
                <Flex direction="column" gap="2">
                  <Dialog.Title className="mb-0">Start Selling Tickets</Dialog.Title>
                  <Text size="2" color="gray">
                    Once you link a Stripe account, you’ll receive daily payouts to your linked bank account.
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap="4" maxWidth="550px">
                <Flex width="100%" gap="2">
                  <Button size="3" color="gray" type="submit" highContrast mt="2" className="w-full">
                    Link Existing Stripe Account
                  </Button>
                </Flex>
                <Text size="2" color="red">
                  {error}
                </Text>
              </Flex>
            </Dialog.Content>
          </form>
        </FormProvider>
      </Dialog.Container>
    </Dialog.Root>
  );
}
