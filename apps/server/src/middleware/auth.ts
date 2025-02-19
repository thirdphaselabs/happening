// Javascript Object Signing and Encryption (JOSE)
// https://www.npmjs.com/package/jose
import { createRemoteJWKSet, jwtVerify } from "jose";
import { environment } from "../environment";
import { sealData, unsealData } from "iron-session";
import WorkOS, { Session, SessionResponse } from "@workos-inc/node";
import { NextFunction, Request, Response } from "express";
import { prisma } from "@plaventi/database";
import { PlaventiSession } from "../modules/auth/auth.controller";
import { profileInclude } from "../modules/profile/entities/profile.entity";
import { SessionWithOrg } from "../types/types";
import { getSession, verifyAccessToken } from "../modules/auth/helpers/session";

const clientId = environment.WORKOS_CLIENT_ID;

const workos = new WorkOS(environment.WORKOS_API_KEY);

// Set the JWKS URL. This is used to verify if the JWT is still valid
const JWKS = createRemoteJWKSet(new URL(workos.userManagement.getJwksUrl(clientId)));

// Auth middleware function
export async function withWorkOsAuth(req: Request, res: Response, next: NextFunction) {
  // First, attempt to get the session from the cookie
  const session = await getSession(req.cookies["wos-session"]);

  // If no session, redirect the user to the login page
  if (!session) {
    return res.redirect(`${environment.APP_URL}/login`);
  }
  const hasValidSession = await verifyAccessToken(session.accessToken);

  // If the session is valid, move on to the next function
  if (hasValidSession) {
    req.session = session;
    return next();
  }

  try {
    // If the session is invalid (i.e. the access token has expired)
    // attempt to re-authenticate with the refresh token
    const { accessToken, refreshToken } = await workos.userManagement.authenticateWithRefreshToken({
      clientId,
      refreshToken: session.refreshToken,
    });

    const decodedAccessToken = await jwtVerify(accessToken, JWKS);

    const sessionId = decodedAccessToken.payload.sid as string;

    const profile = await prisma.profile.findUnique({
      where: {
        workosId: session.user.id,
      },
      include: profileInclude,
    });

    if (!profile) {
      return res.status(401);
    }

    const sessionData: PlaventiSession = {
      sessionId: sessionId,
      accessToken,
      refreshToken,
      user: session.user,
      impersonator: session.impersonator,
      profile,
      organisationId: profile.team?.workosOrganisationId ?? null,
    };

    req.session = sessionData;

    return next();
  } catch (e) {
    // Failed to refresh access token, redirect user to login page
    // after deleting the cookie
    return res.status(401);
  }
}

export async function withWorkOsOrgAuth(req: Request, res: Response, next: NextFunction) {
  // First, attempt to get the session from the cookie
  const session = await getSession(req.cookies["wos-session"]);

  // If no session, redirect the user to the login page
  if (!session) {
    return res.redirect(`${environment.APP_URL}/login`);
  }
  const hasValidSession = await verifyAccessToken(session.accessToken);

  // If the session is valid, move on to the next function
  if (hasValidSession) {
    if (!session.profile.team) {
      return res.status(401);
    }
    const sessionData: SessionWithOrg = {
      ...session,
      profile: session.profile,
      team: session.profile.team,
    };

    req.orgSession = sessionData;
    return next();
  }

  try {
    // If the session is invalid (i.e. the access token has expired)
    // attempt to re-authenticate with the refresh token
    const { accessToken, refreshToken } = await workos.userManagement.authenticateWithRefreshToken({
      clientId,
      refreshToken: session.refreshToken,
    });

    const decodedAccessToken = await jwtVerify(accessToken, JWKS);

    const sessionId = decodedAccessToken.payload.sid as string;

    const profile = await prisma.profile.findUnique({
      where: {
        workosId: session.user.id,
      },
      include: profileInclude,
    });

    if (!profile || !profile.team) {
      return res.status(401);
    }

    const sessionData: SessionWithOrg = {
      sessionId: sessionId,
      accessToken,
      refreshToken,
      user: session.user,
      impersonator: session.impersonator,
      profile,
      team: profile.team,
    };

    req.orgSession = sessionData;

    return next();
  } catch (e) {
    // Failed to refresh access token, redirect user to login page
    // after deleting the cookie
    return res.status(401);
  }
}
