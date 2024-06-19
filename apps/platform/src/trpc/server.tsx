import type { AppRouter } from "@plaventi/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { cookies, headers } from "next/headers";
import { transformer } from "./transformer";
import { getUrl } from "./utils/getUrl";

export const serverClient = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    httpBatchLink({
      url: getUrl(),
      headers() {
        const cookiesList = cookies();
        const newHeaders = new Map(headers());

        // If you're using Node 18 before 18.15.0, omit the "connection" header
        newHeaders.delete("connection");

        // `x-trpc-source` is not required, but can be useful for debugging
        newHeaders.set("x-trpc-source", "rsc");

        const token = cookiesList.get("wos-session")?.value;

        if (token) {
          newHeaders.set("Authorization", `${token}`);
        }

        // Forward headers from the browser to the API
        return Object.fromEntries(newHeaders);
      },
      async fetch(url, options) {
        const cookiesList = cookies();
        const sessionCookie = cookiesList.get("wos-session")?.value;
        return fetch(url, {
          ...options,
          credentials: "include",
          headers: {
            ...options?.headers,
            ...(sessionCookie ? { Authorization: `${sessionCookie}` } : {}),
          },
        });
      },
    }),
  ],
});
