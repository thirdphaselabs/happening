import { faker } from "@faker-js/faker";
import { Avatar, AvatarProps } from "@radix-ui/themes";
import { User } from "@workos-inc/node";
import { buildOrganizationFallbackInitials } from "~/lib/utils";

export function UserAvatar({
  user,
  size = "1",
  color = "sky",
  image,
}: {
  user: User;
  size?: AvatarProps["size"];
  color?: AvatarProps["color"];
  image?: string;
}) {
  return (
    <Avatar
      size={size}
      src={image ?? undefined}
      fallback={buildOrganizationFallbackInitials({
        name: `${user.firstName} ${user.lastName}`,
      })}
      color={color}
      radius="full"
    />
  );
}
