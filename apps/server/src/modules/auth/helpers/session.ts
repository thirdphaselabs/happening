import { createRemoteJWKSet, jwtVerify } from "jose";
import WorkOS from "@workos-inc/node";
import { unsealData } from "iron-session";

import { environment } from "../../../environment";
import { PlaventiSession } from "../auth.controller";

const workos = new WorkOS(environment.WORKOS_API_KEY);
const clientId = environment.WORKOS_CLIENT_ID;

const JWKS = createRemoteJWKSet(new URL(workos.userManagement.getJwksUrl(clientId)));

export async function getSession(accessToken: string | undefined): Promise<PlaventiSession | null> {
  if (accessToken) {
    return unsealData(accessToken, {
      password: environment.WORKOS_COOKIE_PASSWORD,
    });
  }

  return null;
}

export async function verifyAccessToken(accessToken: string) {
  console.log("accessToken", accessToken);
  try {
    await jwtVerify(accessToken, JWKS);
    return true;
  } catch (e) {
    console.warn("Failed to verify session:", e);
    return false;
  }
}
