import { Prisma } from "@prisma/client";

export const profileInclude = Prisma.validator<Prisma.ProfileInclude>()({
  team: {
    include: {
      paymentAccount: true,
    },
  },
});

export type Profile = Prisma.ProfileGetPayload<{
  include: typeof profileInclude;
}>;
