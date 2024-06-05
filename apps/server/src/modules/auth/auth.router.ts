import { z } from "zod";
import { createTRPCRouter } from "../../trpc/context";
import { publicProcedure, workOsProcedure } from "../../trpc/procedures";
import { TRPCError } from "@trpc/server";
import { AuthService } from "./auth.service";
import { environment } from "../../environment";
import { PlaventiSession } from "./auth.controller";

const authService = new AuthService();

export const authRouter = createTRPCRouter({
  session: workOsProcedure.query(async ({ ctx }) => {
    return ctx.session as PlaventiSession;
  }),
  getActiveOrganization: workOsProcedure.query(async ({ ctx }) => {
    try {
      const organisation = await authService.getActiveOrganization(ctx.session.user.id);

      return {
        workosOrganisationId: organisation?.workosOrganisationId,
        name: organisation?.name,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching active organization",
      });
    }
  }),
  completeOnboarding: workOsProcedure.mutation(async ({ ctx }) => {
    try {
      await authService.completeOnboarding(ctx.session.user.id);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while completing onboarding",
      });
    }
  }),
  isEmailAssociatedWithAccount: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return authService.isEmailAssociatedWithUser(input.email);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while checking if email is associated with an account",
        });
      }
    }),
});
