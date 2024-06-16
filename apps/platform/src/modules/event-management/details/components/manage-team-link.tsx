"use client";

import { CaretRightIcon } from "@radix-ui/react-icons";
import { Link } from "@radix-ui/themes";
import { useUser } from "~/modules/auth/user.context";

export function ManageTeamLink() {
  const { profile } = useUser();

  if (!profile.team) {
    return null;
  }

  return (
    <Link
      size="2"
      color="gray"
      className="flex items-center gap-1 font-medium"
      mb="2"
      href={`/team/manage/${profile.team.identifier}/events`}>
      9-5 Events
      <CaretRightIcon />
    </Link>
  );
}
