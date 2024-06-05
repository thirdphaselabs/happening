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
  async createUser(args: { firstName: string | null; lastName: string | null; workosUserId: string }) {
    return prisma.profile.create({
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
        workosId: args.workosUserId,
        userRole: ProfileRole.MEMBER,
      },
    });
  }
}
