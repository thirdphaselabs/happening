// import "@types/qs";
// import "@types/express-serve-static-core";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter } from "../../trpc/context";
import { protectedProcedure } from "../../trpc/procedures";
import { OnboardingService } from "./onboarding.service";
import { OnboardingStep } from "../../types/types";

const onboardingService = new OnboardingService();

export const onboardingRouter = createTRPCRouter({
  getCurrentOnboardingStep: protectedProcedure
    .output(
      z.object({
        onboardingStep: z.nativeEnum(OnboardingStep),
      }),
    )
    .query(async ({ ctx }) => {
      try {
        const { onboardingStep } = await onboardingService.getCurrentOnboardingStep(ctx.auth);
        return { onboardingStep };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching onboarding step",
        });
      }
    }),
  completeCurrentOnboardingStep: protectedProcedure
    .output(
      z.object({
        nextStep: z.nativeEnum(OnboardingStep),
      }),
    )
    .mutation(async ({ ctx }) => {
      try {
        const result = await onboardingService.completeCurrentOnboardingStep(ctx.auth);
        return { nextStep: result.nextStep };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating onboarding step",
        });
      }
    }),

  completeOnboarding: protectedProcedure
    .input(
      z.object({
        organisations: z.object({ orgId: z.string(), orgMembershipId: z.string() }).array(),
      }),
    )
    .mutation(async ({ ctx, input: { organisations } }) => {
      try {
        await onboardingService.completeOnboarding(ctx.auth, { organisations });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while completing onboarding",
        });
      }
    }),

  completePersonalDetails: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        organisations: z.object({ orgId: z.string(), orgMembershipId: z.string() }).array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await onboardingService.beginOnboarding(ctx.auth, { organisations: input.organisations });
        const { nextStep } = await onboardingService.completePersonalDetails(ctx.auth, input);

        return {
          nextStep,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while completing personal details",
        });
      }
    }),

  createOrganization: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        domain: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { name, domain } }) => {
      try {
        const nextStep = await onboardingService.createOrganization(ctx.auth, {
          name,
          domain,
        });

        return {
          nextStep,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating organization",
        });
      }
    }),

  inviteTeamMembers: protectedProcedure
    .input(
      z.object({
        organisations: z.object({ orgId: z.string(), orgMembershipId: z.string() }).array(),
        invites: z
          .object({
            email: z.string(),
          })
          .array()
          .max(3),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { nextStep } = await onboardingService.inviteTeamMembers(ctx.auth, {
          invites: input.invites,
          organisations: input.organisations,
        });
        await onboardingService.completeOnboarding(ctx.auth, { organisations: input.organisations });

        return {
          nextStep,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while inviting team members",
        });
      }
    }),
  resetOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await onboardingService.resetOnboarding(ctx.auth);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while resetting onboarding",
      });
    }
  }),
});
