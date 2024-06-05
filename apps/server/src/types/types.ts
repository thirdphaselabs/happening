import { Profile } from "@prisma/client";
import { Impersonator, User } from "@workos-inc/node";

export type UserId = string;
export type OrganizationId = string;

export type AuthWithUser = {
  userId: UserId;
};

export type AuthWithOrg = {
  profile: Profile;
  organizationId: OrganizationId;
};

export type SessionWithOrg = {
  sessionId: string;
  accessToken: string;
  refreshToken: string;
  user: User;
  profile: Profile;
  impersonator: Impersonator | undefined;
  organisationId: string;
};
