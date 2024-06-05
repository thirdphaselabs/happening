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
        organisation: true,
      },
    });

    return user.organisation;
  }
  async createUser(args: {
    firstName: string;
    lastName: string;
    workosUserId: string;
    workosOrganisationId: string;
    userRole: ProfileRole;
  }) {
    const organisation = await prisma.organisation.findUniqueOrThrow({
      where: {
        workosOrganisationId: args.workosOrganisationId,
      },
    });

    return prisma.profile.create({
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
        workosId: args.workosUserId,
        userRole: args.userRole,
        organisation: {
          connect: {
            id: organisation.id,
          },
        },
      },
    });
  }
}
