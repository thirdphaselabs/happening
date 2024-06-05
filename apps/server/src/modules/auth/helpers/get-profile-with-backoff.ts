import { prisma } from "@plaventi/database";
import { Profile } from "../../profile/entities/profile.entity";
import { exponentialBackOff } from "../../../helpers/exponential-backoff";

export async function getProfileWithBackOff(workosUserId: string): Promise<Profile | null> {
  let profile: Profile | null = null;

  try {
    profile = await prisma.profile.findUnique({
      where: {
        workosId: workosUserId,
      },
      include: {
        team: true,
      },
    });

    if (!profile) {
      throw new Error("Profile not found");
    }
  } catch (initialError) {
    console.error("Initial fetch profile error:", initialError);

    profile = await exponentialBackOff({
      retries: 3,
      delay: 1000,
      callback: async () => {
        console.log("Retrying to fetch profile");
        return await prisma.profile.findUniqueOrThrow({
          where: {
            workosId: workosUserId,
          },
          include: {
            team: true,
          },
        });
      },
    }).catch((retryError) => {
      console.error("Exponential backoff fetch profile error:", retryError);
      return null; // Handle this appropriately, perhaps set an error response
    });
  }

  return profile;
}
