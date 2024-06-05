import { prisma } from "@plaventi/database";

export class OnboardingPersistence {
  async getOnboarding(userId: string) {
    return prisma.onboarding.findUniqueOrThrow({
      where: {
        workosUserId: userId,
      },
    });
  }
  async getOrganisation(userId: string) {
    const onboarding = await prisma.onboarding.findUnique({
      where: {
        workosUserId: userId,
      },
    });

    if (!onboarding?.organisationId) {
      throw new Error("User is not part of an organisation");
    }

    return prisma.organisation.findUnique({
      where: {
        id: onboarding.organisationId,
      },
    });
  }

  async beginOnboarding(userId: string) {
    await prisma.onboarding.create({
      data: {
        workosUserId: userId,
      },
    });
  }
  async createOrganization(
    userId: string,
    args: { workosOrganizationId: string; name: string; domain: string },
  ) {
    const organisation = await prisma.organisation.create({
      data: {
        name: args.name,
        workosOrganisationId: args.workosOrganizationId,
        domain: args.domain,
      },
    });

    await prisma.onboarding.update({
      where: {
        workosUserId: userId,
      },
      data: {
        organisationId: organisation.id,
      },
    });
  }

  async completePersonalDetails(userId: string, args: { firstName: string; lastName: string }) {
    return prisma.onboarding.update({
      where: {
        workosUserId: userId,
      },
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
      },
    });
  }
}
