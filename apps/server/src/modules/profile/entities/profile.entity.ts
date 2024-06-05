import { Prisma } from "@prisma/client";

export const profileInclude = Prisma.validator<Prisma.ProfileInclude>()({
  team: true,
});

export type Profile = Prisma.ProfileGetPayload<{
  include: typeof profileInclude;
}>;
