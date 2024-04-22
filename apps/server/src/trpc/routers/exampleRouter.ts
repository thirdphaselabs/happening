import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../procedures";
import { createTRPCRouter, t } from "../context";
import { prisma } from "@plaventi/database";

export const eventsRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return { yesnow: "Hello World!!!" };
  }),
  helloAgain: publicProcedure.query(() => {
    return { yesnow: "Hello Again World!!!" };
  }),
  all: publicProcedure.query(({ ctx }) => {
    return prisma.event.findMany();
  }),
});
