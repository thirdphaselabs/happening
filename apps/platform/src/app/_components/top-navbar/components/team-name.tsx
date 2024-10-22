"use client";

import { Text } from "@radix-ui/themes";
import { useOptionalUser, useUser } from "~/modules/auth/user.context";

export function TeamName() {
  const user = useOptionalUser();

  if (!user) return null;

  if (!user.profile.team) return null;

  return (
    <Text color="gray" size="2" className="text-gray8 hidden md:block">
      {user.profile.team.name}
    </Text>
  );
}
