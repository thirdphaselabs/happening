"use client";

import type { AppRouter } from "@plaventi/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpBatchLink,
  loggerLink,
  unstable_httpBatchStreamLink as unstableHttpBatchLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import React, { useEffect, useState } from "react";
import { useTRPCContext } from "~/app/_components/trpc.context";
import { transformer } from "./transformer";
import { getUrl } from "./utils/getUrl";

export const api = createTRPCReact<AppRouter>({});

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { accessToken } = useTRPCContext();

  const buildTrpcClient = (token: string | null) =>
    api.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: getUrl(),
          async fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
              headers: {
                ...options?.headers,
                ...(token ? { Authorization: `${token}` } : {}),
              },
            });
          },
          maxURLLength: 2083,
        }),
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error),
        }),
        unstableHttpBatchLink({
          url: getUrl(),
          async fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
              headers: {
                ...options?.headers,
                ...(token ? { Authorization: `${token}` } : {}),
              },
            });
          },
        }),
      ],
    });

  const [trpcClient, setTrpcClient] = useState(buildTrpcClient(accessToken ?? null));

  useEffect(() => {
    setTrpcClient(buildTrpcClient(accessToken ?? null));
  }, [accessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
