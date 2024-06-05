import { ProfileRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { SessionWithOrg } from "../../types/types";
import { t } from "../context";
// Javascript Object Signing and Encryption (JOSE)
// https://www.npmjs.com/package/jose
import WorkOS from "@workos-inc/node";
import { Request } from "express";
import { unsealData } from "iron-session";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { PlaventiSession } from "../../modules/auth/auth.controller";
import { environment } from "../../environment";

const workos = new WorkOS(environment.WORKOS_API_KEY);

const clientId = environment.WORKOS_CLIENT_ID;

const JWKS = createRemoteJWKSet(new URL(workos.userManagement.getJwksUrl(clientId)));

async function getSessionFromCookie(cookies: Request["cookies"]): Promise<PlaventiSession | null> {
  const cookie = cookies["wos-session"];

  if (cookie) {
    return unsealData(cookie, {
      password: environment.WORKOS_COOKIE_PASSWORD,
    });
  }

  return null;
}

async function verifyAccessToken(accessToken: string) {
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

  console.log("session in prod", session);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session" });
  }

  const hasValidSession = await verifyAccessToken(session.accessToken);

  // If the session is valid, move on to the next function
  if (!hasValidSession) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Session is invalid" });
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

  console.log("session in prod", session);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session" });
  }

  const hasValidSession = await verifyAccessToken(session.accessToken);

  // If the session is valid, move on to the next function
  if (!hasValidSession || !session.organisationId || !session.profile) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Session is invalid" });
  }

  const sessionWithOrg: SessionWithOrg = {
    ...session,
    organisationId: session.organisationId,
    profile: session.profile,
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
