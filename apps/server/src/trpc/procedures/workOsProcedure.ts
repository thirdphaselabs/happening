import { TRPCError } from "@trpc/server";
import WorkOS from "@workos-inc/node";
import { unsealData } from "iron-session";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { environment } from "../../environment";
import { PlaventiSession } from "../../modules/auth/auth.controller";
import { SessionWithOrg } from "../../types/types";
import { t } from "../context";

const workos = new WorkOS(environment.WORKOS_API_KEY);

const clientId = environment.WORKOS_CLIENT_ID;

const JWKS = createRemoteJWKSet(new URL(workos.userManagement.getJwksUrl(clientId)));

async function getSession(accessToken: string | undefined): Promise<PlaventiSession | null> {
  if (accessToken) {
    return unsealData(accessToken, {
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
  const accessToken = ctx.req.cookies["wos-session"] ?? ctx.req.headers["Authorization"];

  console.log("hasValidSession", {
    accessToken,
    cookie: ctx.req.cookies["wos-session"],
    header: ctx.req.headers["Authorization"],
  });

  const session = await getSession(accessToken);

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
  const accessToken = ctx.req.cookies["wos-session"] ?? ctx.req.headers["Authorization"];
  console.log("hasValidSessionWithOrg", {
    accessToken,
    cookie: ctx.req.cookies["wos-session"],
    header: ctx.req.headers["Authorization"],
  });
  const session = await getSession(accessToken);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No session" });
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
