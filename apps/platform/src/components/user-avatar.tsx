import { Avatar } from "@radix-ui/themes";
import { User } from "@workos-inc/node";
import { buildOrganizationFallbackInitials } from "~/lib/utils";

export function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar
      size="1"
      src={user.profilePictureUrl ?? undefined}
      fallback={buildOrganizationFallbackInitials({
        name: `${user.firstName} ${user.lastName}`,
      })}
      color="sky"
      radius="full"
    />
  );
}
