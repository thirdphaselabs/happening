export type UserId = string;
export type OrganizationId = string;

export type AuthWithUser = {
  userId: UserId;
};

export type AuthWithOrg = {
  userId: UserId;
  organizationId: OrganizationId;
};

export enum OnboardingStep {
  Profile = "Profile",
  Create = "CreateCompany",
  Invite = "InviteTeam",
  Complete = "Complete",
}
