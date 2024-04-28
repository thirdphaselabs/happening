import { TRPCError } from "@trpc/server";
import { t } from "../context";
import { UserRole } from "@prisma/client";
import { OnboardingStep } from "../../types/types";

export type AuthContext = {
  sessionId: string;
  userId: string;
  role?: UserRole;
  onboardingComplete: boolean;
  onboardingStep: OnboardingStep;
};

const hasValidSessionToken = t.middleware(async ({ ctx, next }) => {
  const auth = ctx.req.auth;

  if (!auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

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

export type AuthContextWithOrganisation = {
  sessionId: string;
  userId: string;
  role?: UserRole;
  onboardingComplete: boolean;
  onboardingStep: OnboardingStep;
  organisationId: string;
};

export const protectedProcedure = t.procedure.use(hasValidSessionToken);

const hasValidSessionTokenAndOrganisation = t.middleware(async ({ ctx, next }) => {
  const auth = ctx.req.auth;

  console.log({ auth });

  if (!auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { sessionId, userId, role, organisationId } = ctx.req.auth;

  if (!sessionId || !userId || !organisationId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const authContext: AuthContextWithOrganisation = {
    sessionId,
    userId,
    role,
    onboardingComplete: ctx.req.auth.onboardingComplete ?? false,
    onboardingStep: ctx.req.auth.onboardingStep ?? OnboardingStep.Profile,
    organisationId,
  };

  return next({
    ctx: {
      ...ctx,
      auth: authContext,
    },
  });
});

export const organisationProcedure = t.procedure.use(hasValidSessionTokenAndOrganisation);
