import { z } from "zod";
// import "@types/qs";
// import "@types/express-serve-static-core";
import { createTRPCRouter } from "../../trpc/context";
import { publicProcedure } from "../../trpc/procedures";
import { WaitlistService } from "./waitlist.service";
import { TRPCError } from "@trpc/server";
import { AlreadyOnWaitlistError } from "./use-cases/join-waitlist";

const waitlistService = new WaitlistService();

export const waitlistRouter = createTRPCRouter({
  join: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await waitlistService.join({ email: input.email });
      } catch (error) {
        if (error instanceof AlreadyOnWaitlistError) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "You are already on the waitlist",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while joining the waitlist",
        });
      }
    }),
});
