import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { Session } from "~/trpc/types";
import WorkOS from "@workos-inc/node";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { isString } from "~/utils/helpers";

const workos = new WorkOS(process.env.WORKOS_API_KEY as string);

const JWKS = createRemoteJWKSet(
  new URL(workos.userManagement.getJwksUrl(process.env.WORKOS_CLIENT_ID as string)),
);

type GetSessionReturnType<T extends boolean> = T extends true ? Session : Session | null;

async function verifyAccessToken(accessToken: string) {
  console.log("accessToken aaa", accessToken);
  try {
    await jwtVerify(accessToken, JWKS);
    return true;
  } catch (e) {
    console.warn("Failed to verify session:", e);
    return false;
  }
}

export async function getSession<T extends boolean>(options?: {
  ensureSignedIn?: T;
}): Promise<GetSessionReturnType<T>> {
  const { ensureSignedIn = false } = options ?? {};

  const session = await getIronSession<Session>(cookies(), {
    password: "mcRI+dvCYeIAUu4DPlzhEkq+6nLFpW6xY0CD20hFWPytKeDtMGqU0XN6d7c/PEMp3dyNB21U5LyBHxcmxak3tA==",
    cookieName: "wos-session",
  });

  console.log("session", session);

  if (!session || !isString(session.accessToken)) {
    if (ensureSignedIn) {
      throw new Error("User is not signed in");
    } else {
      return null as GetSessionReturnType<T>;
    }
  }

  const hasValidSession = await verifyAccessToken(session.accessToken);

  if (!hasValidSession) {
    if (ensureSignedIn) {
      throw new Error("User is not signed in");
    } else {
      return null as GetSessionReturnType<T>;
    }
  }

  return session as GetSessionReturnType<T>;
}

export async function buildSessionFromToken(accessToken: string) {
  const hasValidSession = await verifyAccessToken(accessToken);

  if (!hasValidSession) {
    return null;
  }
}
