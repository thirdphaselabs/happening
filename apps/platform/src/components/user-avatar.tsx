import { Avatar, AvatarProps } from "@radix-ui/themes";
import { User } from "@workos-inc/node";
import { buildOrganizationFallbackInitials } from "~/lib/utils";

export function UserAvatar({ user, size = "1" }: { user: User; size?: AvatarProps["size"] }) {
  return (
    <Avatar
      size={size}
      src={user.profilePictureUrl ?? undefined}
      fallback={buildOrganizationFallbackInitials({
        name: `${user.firstName} ${user.lastName}`,
      })}
      color="sky"
      radius="full"
    />
  );
}
