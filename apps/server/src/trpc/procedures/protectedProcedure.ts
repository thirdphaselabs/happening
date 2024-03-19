import { TRPCError } from "@trpc/server";
import { t } from "../context";
import { prisma } from "@template/database";

const isAdmin = t.middleware(async ({ ctx, next }) => {
  const event = await prisma.event.findFirst();

  if (!event) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      event,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAdmin);
