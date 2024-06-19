import { TRPCError } from "@trpc/server";
import { getSession, verifyAccessToken } from "../../modules/auth/helpers/session";
import { SessionWithOrg } from "../../types/types";
import { t } from "../context";

const hasValidSession = t.middleware(async ({ ctx, next }) => {
  if (!ctx.sessionToken) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session token" });
  }

  console.log("hasValidSessionWithOrg", {
    sessionToken: ctx.sessionToken,
  });
  const session = await getSession(ctx.sessionToken);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session" });
  }

  const hasValidSession = await verifyAccessToken(session.accessToken);

  // If the session is valid, move on to the next function
  if (!hasValidSession) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Session is invalid" });
  }

  console.log("valid session in workOsProcedure", session);

  return next({
    ctx: {
      ...ctx,
      session,
    },
  });
});

const hasValidSessionWithOrg = t.middleware(async ({ ctx, next }) => {
  console.log("hasValidSessionWithOrg", {
    sessionToken: ctx.sessionToken,
  });

  if (!ctx.sessionToken) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session token" });
  }

  const session = await getSession(ctx.sessionToken);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session org" });
  }

  const hasValidSession = await verifyAccessToken(session.accessToken);

  // If the session is valid, move on to the next function
  if (!hasValidSession || !session.profile || !session.profile.team) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Session is invalid org" });
  }

  const sessionWithOrg: SessionWithOrg = {
    ...session,
    profile: session.profile,
    team: session.profile.team,
  };

  return next({
    ctx: {
      ...ctx,
      session: sessionWithOrg,
    },
  });
});

export const workOsProcedure = t.procedure.use(hasValidSession);
export const workOsWithOrgProcedure = t.procedure.use(hasValidSessionWithOrg);
