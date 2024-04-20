import { UserRole, prisma } from "@plaventi/database";

export class AuthPersistence {
  async getUserByClerkId(clerkUserId: string) {
    return prisma.user.findUniqueOrThrow({
      where: {
        clerkId: clerkUserId,
      },
    });
  }
  async getOrganizationByUserId(userId: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId,
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
    clerkId: string;
    clerkOrganisationId: string;
    userRole: UserRole;
  }) {
    const organisation = await prisma.organisation.findUniqueOrThrow({
      where: {
        clerkOrganisationId: args.clerkOrganisationId,
      },
    });

    return prisma.user.create({
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
        clerkId: args.clerkId,
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
