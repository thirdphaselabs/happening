import { z } from "zod";
// import "@types/qs";
// import "@types/express-serve-static-core";
import { createTRPCRouter } from "../../trpc/context";
import { protectedProcedure, publicProcedure } from "../../trpc/procedures";
import { TRPCError } from "@trpc/server";
import { AuthService } from "./auth.service";
import { UserMetadataService } from "../user-metadata/user-metadata.service";

const authService = new AuthService();
const userMetadataService = new UserMetadataService();

export const authRouter = createTRPCRouter({
  getRole: protectedProcedure.query(async ({ input, ctx }) => {
    try {
      const metadata = await userMetadataService.getMetadata(ctx.auth.userId);
      return metadata.role;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while adding role",
      });
    }
  }),
  getPublicMetadata: protectedProcedure.query(async ({ ctx }) => {
    try {
      const metadata = await userMetadataService.getMetadata(ctx.auth.userId);

      return metadata;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching user metadata",
      });
    }
  }),
  getActiveOrganization: protectedProcedure.query(async ({ ctx }) => {
    try {
      const organisation = await authService.getActiveOrganization(ctx.auth.userId);

      return {
        clerkOrganisationId: organisation?.clerkOrganisationId,
        name: organisation?.name,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching active organization",
      });
    }
  }),
  completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await authService.completeOnboarding(ctx.auth.userId);
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
