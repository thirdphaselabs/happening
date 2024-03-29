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
