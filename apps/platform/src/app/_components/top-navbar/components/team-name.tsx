"use client";

import { Text } from "@radix-ui/themes";
import { useUser } from "~/modules/auth/user.context";

export function TeamName() {
  const { profile } = useUser();

  if (!profile.team) return null;

  return (
    <Text color="gray" size="2" className="text-gray8">
      {profile.team.name}
    </Text>
  );
}
