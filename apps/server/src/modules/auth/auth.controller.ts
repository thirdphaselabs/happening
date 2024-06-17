import { Router, Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { Impersonator, User, WorkOS } from "@workos-inc/node";
import { environment } from "../../environment";
import { withWorkOsAuth } from "../../middleware/auth";
import { getProfileWithBackOff } from "./helpers/get-profile-with-backoff";
import { sealData } from "iron-session";
import { prisma } from "@plaventi/database";
import { Profile, profileInclude } from "../profile/entities/profile.entity";

const workos = new WorkOS(environment.WORKOS_API_KEY);
const clientId = environment.WORKOS_CLIENT_ID;
const JWKS = createRemoteJWKSet(new URL(workos.userManagement.getJwksUrl(clientId)));

export type PlaventiSession = {
  sessionId: string;
  accessToken: string;
  refreshToken: string;
  user: User;
  profile: Profile;
  impersonator: Impersonator | undefined;
  organisationId: string | null;
};

const authController = Router();

const { API_URL, APP_URL } = environment;

authController.get("/login", async (req: Request, res: Response) => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: "GoogleOAuth",
    redirectUri: `${API_URL}/api/auth/callback`,
    clientId,
  });

  return res.redirect(authorizationUrl);
});

authController.get("/callback", async (req, res) => {
  // The authorization code returned by AuthKit
  const code = req.query.code;

  if (!code || typeof code !== "string") {
    return res.status(400).send("Invalid code");
  }

  const { user, accessToken, refreshToken, impersonator } = await workos.userManagement.authenticateWithCode({
    code,
    clientId,
  });

  const decodedAccessToken = await jwtVerify(accessToken, JWKS);

  const sessionId = decodedAccessToken.payload.sid as string;

  const profile = await getProfileWithBackOff(user.id);

  if (!profile) {
    return res.redirect(APP_URL);
  }

  const sessionData: PlaventiSession = {
    sessionId: sessionId,
    accessToken,
    refreshToken,
    user,
    impersonator,
    profile,
    organisationId: profile.team?.workosOrganisationId ?? null,
  };

  // The refreshToken should never be accessible publicly,
  // hence why we encrypt it in the cookie session.
  // Alternatively you could persist the refresh token in a backend database
  const encryptedSession = await sealData(sessionData, { password: environment.WORKOS_COOKIE_PASSWORD });

  // Store the session in a cookie
  res.cookie("wos-session", encryptedSession, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });

  res.redirect(APP_URL);
});

authController.get("/refresh", withWorkOsAuth, async (req: Request, res: Response) => {
  const fetchUserInfo = req.query.fetchUserInfo;
  const session = req.session;
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
    return res.status(400).send("Profile not found");
  }

  let updatedUser: User | null;

  if (fetchUserInfo) {
    updatedUser = await workos.userManagement.getUser(session.user.id);
  } else {
    updatedUser = session.user;
  }

  const sessionData: PlaventiSession = {
    sessionId: sessionId,
    accessToken,
    refreshToken,
    user: updatedUser ?? session.user,
    impersonator: session.impersonator,
    profile,
    organisationId: profile.team?.workosOrganisationId ?? null,
  };

  const encryptedSession = await sealData(sessionData, { password: environment.WORKOS_COOKIE_PASSWORD });

  res.cookie("wos-session", encryptedSession, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });

  res.json(sessionData);
});

authController.get("/logout", withWorkOsAuth, async (req: Request, res: Response) => {
  const session = req.session;
  console.log({ session });
  res.clearCookie("wos-session");
  const logoutUrl = workos.userManagement.getLogoutUrl({
    sessionId: session.sessionId,
  });
  res.redirect(logoutUrl);
});

export { authController };
