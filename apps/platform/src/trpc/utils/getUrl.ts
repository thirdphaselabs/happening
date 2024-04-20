import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { invariant } from "~/utils/helpers";

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SERVER_DEPLOY_URL) {
    return process.env.NEXT_PUBLIC_SERVER_DEPLOY_URL;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:3002`;
}

export function getUrl(): string {
  const url = `${getBaseUrl()}/api/trpc`;
  return url;
}

export async function getCurrentUser() {
  const user = await currentUser();
  if (!user) {
    redirectToSignIn();
    invariant(user, "User is not authenticated");
  }
  return user;
}
