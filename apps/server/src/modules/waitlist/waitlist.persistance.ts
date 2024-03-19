import { prisma } from "@plaventi/database";

export class WaitlistPersistance {
  async getByEmail(args: { email: string }) {
    return prisma.waitlist.findFirst({
      where: {
        email: args.email,
      },
    });
  }

  async join(args: { email: string }) {
    await prisma.waitlist.create({
      data: {
        email: args.email,
      },
    });
  }
}
