import { TRPCError } from "@trpc/server";
import { t } from "../context";
import { OnboardingStep } from "../../modules/onboarding/onboarding.service";
import { UserRole } from "@prisma/client";

export type AuthContext = {
  sessionId: string;
  userId: string;
  role?: UserRole;
  onboardingComplete: boolean;
  onboardingStep: OnboardingStep;
};

const hasValidSessionToken = t.middleware(async ({ ctx, next }) => {
  const { sessionId, userId, role } = ctx.req.auth;

  if (!sessionId || !userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const authContext: AuthContext = {
    sessionId,
    userId,
    role,
    onboardingComplete: ctx.req.auth.onboardingComplete ?? false,
    onboardingStep: ctx.req.auth.onboardingStep ?? OnboardingStep.Welcome,
  };

  return next({
    ctx: {
      ...ctx,
      auth: authContext,
    },
  });
});

export const protectedProcedure = t.procedure.use(hasValidSessionToken);
