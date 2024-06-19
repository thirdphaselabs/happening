import { environment } from "~/utils/env";

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SERVER_DEPLOY_URL) {
    return process.env.NEXT_PUBLIC_SERVER_DEPLOY_URL;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return environment.apiUrl;
}

export function getUrl(): string {
  const url = `${getBaseUrl()}/api/trpc`;
  return url;
}
