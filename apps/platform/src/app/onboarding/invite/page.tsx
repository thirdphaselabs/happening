"use client";

import { Button, TextFieldRoot } from "@plaventi/ui";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { assertError } from "~/utils/error";
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
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const { inviteTeam, isLoading, error } = useInviteTeam();

  const hasAtLeastOneInviteValue = invites.one?.email || invites.two?.email || invites.three?.email;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const inviteOne = [...(invites.one ? [{ email: invites.one.email }] : [])];
      const inviteTwo = [...(invites.two ? [{ email: invites.two.email }] : [])];
      const inviteThree = [...(invites.three ? [{ email: invites.three.email }] : [])];
      await inviteTeam({
        invites: [...inviteOne, ...inviteTwo, ...inviteThree],
      });
    } catch (error) {
      assertError(error);
      setFormError(error.message);
    }
  };

  return (
    <Flex direction="column" className="h-fit w-[480px] p-8" gap="5">
      <Flex direction="column" gap="2">
        <Text color="gray" size="2">
          Invite your team to work with you within Plaventi. They will receive an email with an invitation to
          join your company.
        </Text>
        <Text color="gray" size="2">
          You can invite more team members later.
        </Text>
      </Flex>
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex direction="column" gap="4" width="100%">
          <Invite name="one" />
          <Invite name="two" />
          <Invite name="three" />

          <Flex direction="column" gap="3" width="100%">
            <Button
              size="3"
              disabled={!hasAtLeastOneInviteValue}
              loading={{
                isLoading,
              }}
              error={{
                errorText: formError ?? error ?? undefined,
                isError: !!formError || !!error,
              }}>
              Continue
            </Button>
            <Button size="3" color="gray">
              I'll do this later
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
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
