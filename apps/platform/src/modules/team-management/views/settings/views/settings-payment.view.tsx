"use client";

import { ArrowTopRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge, Box, Button, Flex, Heading, IconButton, Skeleton, Text } from "@radix-ui/themes";
import Image from "next/image";
import stripeLogo from "~/assets/stripe.svg";
import { LinkStripeAccountDialog } from "../components/link-stripe-account.dialog";
import { api } from "~/trpc/provider";
import { id } from "date-fns/locale";
import { useUser } from "~/modules/auth/user.context";
import { Separator } from "@plaventi/ui";

export function SettingsPaymentView() {
  const { profile } = useUser();
  const stripeAccountId = profile.team?.paymentAccount?.stripeAccountId;
  const { data: paymentAccount, isLoading } = api.paymentAccount.getAccount.useQuery(
    { accountId: stripeAccountId ?? "" },
    { enabled: !!stripeAccountId },
  );
  console.log({ profile, paymentAccount });
  return (
    <Flex direction="column" gap="4" width="100%">
      <Heading size="4">Ticket Sales</Heading>
      {isLoading && stripeAccountId ? (
        <Skeleton loading={true}>
          <Box className="h-[250px]" />
        </Skeleton>
      ) : paymentAccount ? (
        <Flex direction="column" width="100%" className="mb-5 w-1/2 gap-4 rounded-xl bg-white/75 py-3">
          <Flex gap="3" className="px-4">
            <Flex className="relative h-[44px] w-[44px] items-center justify-center rounded-full bg-[#635bff]">
              <Image src={stripeLogo} alt="stripe logo" layout="fill" objectFit="contain" />
            </Flex>
            <Flex gap="1" direction="column">
              <Text size="3" weight="medium">
                Stripe Account
              </Text>
              <Flex>
                <Badge color="green">Connected</Badge>
              </Flex>
            </Flex>
          </Flex>
          <Separator className="w-full" />
          <Flex>
            <Text size="3" color="gray" className="px-4 py-2">
              {paymentAccount.email}
            </Text>
          </Flex>
          <Flex width="100%" gap="2" className="px-4">
            <Button variant="soft" color="gray" className="flex-grow" size="3">
              Open Stripe
              <ArrowTopRightIcon />
            </Button>
            <IconButton variant="soft" color="gray" size="3">
              <DotsHorizontalIcon />
            </IconButton>
          </Flex>
        </Flex>
      ) : (
        <Flex direction="column" width="100%" className="mb-5 gap-4 rounded-xl bg-white/75 px-5 py-4">
          <Flex className="relative h-[44px] w-[44px] items-center justify-center rounded-full bg-[#635bff]">
            <Image src={stripeLogo} alt="stripe logo" layout="fill" objectFit="contain" />
          </Flex>
          <Flex gap="1" direction="column">
            <Heading size="4">Start Selling Tickets</Heading>
            <Text size="3" color="gray">
              Start selling tickets to your events by connecting your Stripe account.
            </Text>
          </Flex>
          <Flex>
            <LinkStripeAccountDialog />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
