"use client";

import { useUser } from "@clerk/nextjs";
import { Button, TextFieldLabel, TextFieldRoot } from "@plaventi/ui";
import { Cross1Icon, Link1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Checkbox, Flex, IconButton, Separator, Text, TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { NotificationCallout } from "~/app/_components/Notification";
import { assertError } from "~/utils/error";
import { OnboardingSectionHeader } from "../_components/OnboardingSectionHeader";
import { useInviteTeam } from "../_hooks/use-invite-team";
import { InviteContextProvider, useInviteContext } from "./_components/invite-context";

export default function OnboardingInvites() {
  return (
    <InviteContextProvider>
      <OnboardingInvitesInner />
    </InviteContextProvider>
  );
}

function OnboardingInvitesInner() {
  const { invites } = useInviteContext();
  const [formError, setFormError] = useState<string | null>(null);
  const { inviteTeam, isLoading, error } = useInviteTeam();
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain");

  const hasAtLeastOneInviteValue = invites.one?.email || invites.two?.email || invites.three?.email;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      toast.custom((id) => <NotificationCallout toastId={id} type="error" message="Still loading" />);
      return;
    }
    const organisations = user.organizationMemberships.map((membership) => {
      return {
        orgId: membership.organization.id,
        orgMembershipId: membership.id,
      };
    });

    try {
      const inviteOne = [...(invites.one ? [{ email: invites.one.email }] : [])];
      const inviteTwo = [...(invites.two ? [{ email: invites.two.email }] : [])];
      const inviteThree = [...(invites.three ? [{ email: invites.three.email }] : [])];
      await inviteTeam({
        invites: [...inviteOne, ...inviteTwo, ...inviteThree],
        organisations,
      });

      await user.reload();

      router.push("/");
    } catch (error) {
      assertError(error);
      setFormError(error.message);
    }
  };

  return (
    <OnboardingSectionHeader
      title="Invite your team members"
      description="Collaborate together on managing your events.">
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex direction="column" gap="6" width="100%">
          <Flex direction="column" gap="4" width="100%">
            <TextFieldRoot>
              <TextFieldLabel>
                Send invites
                <Button variant="ghost" className="m-0 p-1" type="button">
                  <Link1Icon />
                  Get shareable link
                </Button>
              </TextFieldLabel>
              <Flex direction="column" gap="4">
                <TextField.Root size="3" placeholder="Email address" name="teamName" type="email" />
                <TextField.Root size="3" placeholder="Email address" name="teamName" type="email" />
                <TextField.Root size="3" placeholder="Email address" name="teamName" type="email" />
              </Flex>
            </TextFieldRoot>
            <Flex>
              <Button size="2" variant="soft" color="gray">
                <PlusIcon />
                Add more
              </Button>
            </Flex>
          </Flex>
          <Separator orientation="horizontal" className="w-full" />

          <Flex align="start">
            <Checkbox name="disclaimer" className="mr-2 mt-1" defaultChecked />
            {domain ? (
              <Text as="label" size="2" color="gray" className="block">
                Allow anyone with a <Text className="inline-block h-fit w-fit font-bold">{domain}</Text> email
                address to join this team.
              </Text>
            ) : (
              <Text as="label" size="2" color="gray" className="block">
                Allow anyone with your domain's email address to join this team.
              </Text>
            )}
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
              Accept and take me to my dashboard
            </Button>
          </Flex>
        </Flex>
      </form>
    </OnboardingSectionHeader>
  );
}

function Invite({ name }: { name: "one" | "two" | "three" }) {
  const { addInvite, removeInvite, invites } = useInviteContext();

  const email = invites[name]?.email || "";

  return (
    <Flex gap="2" className="flex" width="100%" align="center">
      <TextFieldRoot>
        <TextField.Root
          size="3"
          placeholder="Enter an email"
          name={`${name}Email`}
          type="email"
          value={email}
          onChange={(val) => addInvite(name, val.currentTarget.value)}
        />
      </TextFieldRoot>
      <IconButton
        type="button"
        size="1"
        variant="ghost"
        onClick={() => {
          removeInvite(name);
        }}>
        <Cross1Icon />
      </IconButton>
    </Flex>
  );
}
