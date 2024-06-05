// import "@types/qs";
// import "@types/express-serve-static-core";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter } from "../../trpc/context";
import { workOsProcedure } from "../../trpc/procedures";
import { OnboardingService } from "./onboarding.service";
import { OnboardingStatus } from "@prisma/client";

const onboardingService = new OnboardingService();

export const onboardingRouter = createTRPCRouter({
  getCurrentOnboardingStep: workOsProcedure
    .output(
      z.object({
        onboardingStep: z.nativeEnum(OnboardingStatus),
      }),
    )
    .query(async ({ ctx }) => {
      try {
        const { onboardingStep } = await onboardingService.getCurrentOnboardingStep(ctx.session);
        return { onboardingStep };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching onboarding step",
        });
      }
    }),
  completeCurrentOnboardingStep: workOsProcedure
    .output(
      z.object({
        nextStep: z.nativeEnum(OnboardingStatus),
      }),
    )
    .mutation(async ({ ctx }) => {
      try {
        const result = await onboardingService.completeCurrentOnboardingStep(ctx.session);
        return { nextStep: result.nextStep };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating onboarding step",
        });
      }
    }),

  completeOnboarding: workOsProcedure.mutation(async ({ ctx }) => {
    try {
      await onboardingService.completeOnboarding(ctx.session);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while completing onboarding",
      });
    }
  }),

  completePersonalDetails: workOsProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { nextStep } = await onboardingService.completePersonalDetails(ctx.session, input);

        return {
          nextStep,
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while completing personal details",
        });
      }
    }),

  createOrganization: workOsProcedure
    .input(
      z.object({
        name: z.string(),
        domain: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { name, domain } }) => {
      try {
        const nextStep = await onboardingService.createOrganization(ctx.session, {
          name,
          domain,
        });

        return nextStep;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating organization",
        });
      }
    }),

  inviteTeamMembers: workOsProcedure
    .input(
      z.object({
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
        const { nextStep } = await onboardingService.inviteTeamMembers(ctx.session, {
          invites: input.invites,
        });
        await onboardingService.completeOnboarding(ctx.session);

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
  resetOnboarding: workOsProcedure.mutation(async ({ ctx }) => {
    try {
      await onboardingService.resetOnboarding(ctx.session);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while resetting onboarding",
      });
    }
  }),
});
