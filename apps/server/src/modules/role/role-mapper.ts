import { UserRole } from "@plaventi/database";


export function mapClerkRoleToUserRole(clerkRole: string): UserRole {
  switch (clerkRole) {
    case "org:plaventiadmin":
      return UserRole.PLAVENTI_ADMIN;
    case "org:admin":
      return UserRole.ORGANIZER_ADMIN
    case "org:organizer":
      return UserRole.ORGANIZER;
    case "org:member":
      return UserRole.MEMBER;
    default:
      throw new Error("Invalid clerk role");
  }
}

export function roleToClerkRole(role: UserRole) {
  switch (role) {
    case UserRole.PLAVENTI_ADMIN:
      return "org:plaventiadmin";
    case UserRole.ORGANIZER_ADMIN:
      return "org:admin";
    case UserRole.ORGANIZER:
      return "org:organizer";
    case UserRole.MEMBER:
      return "org:member";
  }
}
