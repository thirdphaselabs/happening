import { prisma } from "@plaventi/database";

export class EventPersistance {
  get() {
    return prisma.event.findMany();
  }

  create(args: { title: string }) {
    return prisma.event.create({
      data: {
        title: args.title,
      },
    });
  }
}
