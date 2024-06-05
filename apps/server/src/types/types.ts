import { Profile } from "@prisma/client";

export type UserId = string;
export type OrganizationId = string;

export type AuthWithUser = {
  userId: UserId;
};

export type AuthWithOrg = {
  profile: Profile;
  organizationId: OrganizationId;
};
