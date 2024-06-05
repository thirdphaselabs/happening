import { OnboardingStatus, prisma } from "@plaventi/database";

export class OnboardingPersistence {
  async completePersonalDetails(profileId: string, args: { firstName: string; lastName: string }) {
    console.log("completePersonalDetails", profileId, args);
    return prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
      },
    });
  }

  async updateToNextStep(profileId: string, onboardingStatus: OnboardingStatus) {
    console.log("updateToNextStep", profileId, onboardingStatus);
    await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        onboardingStatus,
      },
    });
  }
}
