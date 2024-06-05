import { ProfileRole } from "@plaventi/database";

export function mapClerkRoleToUserRole(clerkRole: string): ProfileRole {
  switch (clerkRole) {
    case "org:plaventiadmin":
      return ProfileRole.PLAVENTI_ADMIN;
    case "org:admin":
      return ProfileRole.ORGANIZER_ADMIN;
    case "org:organizer":
      return ProfileRole.ORGANIZER;
    case "org:member":
      return ProfileRole.MEMBER;
    default:
      throw new Error("Invalid clerk role");
  }
}
