import { TRPCError } from "@trpc/server";
import WorkOS from "@workos-inc/node";
import { Request } from "express";
import { unsealData } from "iron-session";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { environment } from "../../environment";
import { PlaventiSession } from "../../modules/auth/auth.controller";
import { SessionWithOrg } from "../../types/types";
import { t } from "../context";

const workos = new WorkOS(environment.WORKOS_API_KEY);

const clientId = environment.WORKOS_CLIENT_ID;

const JWKS = createRemoteJWKSet(new URL(workos.userManagement.getJwksUrl(clientId)));

async function getSessionFromCookie(cookies: Request["cookies"]): Promise<PlaventiSession | null> {
  const cookie = cookies["wos-session"];

  console.log("cookie", cookie);

  if (cookie) {
    return unsealData(cookie, {
      password: environment.WORKOS_COOKIE_PASSWORD,
    });
  }

  return null;
}

async function verifyAccessToken(accessToken: string) {
  console.log("accessToken", accessToken);
  try {
    await jwtVerify(accessToken, JWKS);
    return true;
  } catch (e) {
    console.warn("Failed to verify session:", e);
    return false;
  }
}

const hasValidSession = t.middleware(async ({ ctx, next }) => {
  const session = await getSessionFromCookie(ctx.req.cookies);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session" });
  }

  const hasValidSession = await verifyAccessToken(session.accessToken);

  // If the session is valid, move on to the next function
  if (!hasValidSession) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Session is invalid pal" });
  }

  return next({
    ctx: {
      ...ctx,
      session,
    },
  });
});

const hasValidSessionWithOrg = t.middleware(async ({ ctx, next }) => {
  const session = await getSessionFromCookie(ctx.req.cookies);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session" });
  }

  const hasValidSession = await verifyAccessToken(session.accessToken);

  // If the session is valid, move on to the next function
  if (!hasValidSession || !session.profile || !session.profile.team) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Session is invalid mate" });
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
