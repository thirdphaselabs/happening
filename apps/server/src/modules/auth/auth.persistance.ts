import { ProfileRole, prisma } from "@plaventi/database";

export class AuthPersistence {
  async getUserByClerkId(workosUserId: string) {
    return prisma.profile.findUniqueOrThrow({
      where: {
        workosId: workosUserId,
      },
    });
  }
  async getOrganizationByUserId(workosUserId: string) {
    const user = await prisma.profile.findUniqueOrThrow({
      where: {
        workosId: workosUserId,
      },
      include: {
        team: true,
      },
    });

    return user.team;
  }
  async createProfile(args: {
    firstName: string | null;
    lastName: string | null;
    workosUserId: string;
    stripeCustomerId: string;
  }) {
    return prisma.profile.create({
      data: {
        firstName: args.firstName ?? "plaventi-placeholder",
        lastName: args.lastName ?? "plaventi-placeholder",
        workosId: args.workosUserId,
        userRole: ProfileRole.MEMBER,
        stripeCustomerId: args.stripeCustomerId,
      },
    });
  }
}
