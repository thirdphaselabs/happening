import { TRPCError } from "@trpc/server";
import { t } from "../context";
import { UserRole } from "@prisma/client";
import { OnboardingStep } from "src/modules/user-metadata/user-metadata.service";

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
    onboardingStep: ctx.req.auth.onboardingStep ?? OnboardingStep.Profile,
  };

  return next({
    ctx: {
      ...ctx,
      auth: authContext,
    },
  });
});

export const protectedProcedure = t.procedure.use(hasValidSessionToken);
