"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppRouter } from "@plaventi/server";
import {
  httpBatchLink,
  loggerLink,
  unstable_httpBatchStreamLink as unstableHttpBatchLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import React, { useEffect, useState } from "react";
import { transformer } from "./transformer";
import { getUrl } from "./utils/getUrl";
import { useAuth } from "@clerk/nextjs";
import { useTRPCContext } from "~/app/_components/trpc.context";

export const api = createTRPCReact<AppRouter>({});

export function TRPCReactProvider(props: { children: React.ReactNode; cookies: string | undefined }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { getToken } = useAuth();
  const { accessToken } = useTRPCContext();

  const buildTrpcClient = api.createClient({
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
              ...(props.cookies ? { Authorization: `${props.cookies}` } : {}),
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
              ...(props.cookies ? { Authorization: `${props.cookies}` } : {}),
            },
          });
        },
      }),
    ],
  });

  const [trpcClient, setTrpcClient] = useState(buildTrpcClient);

  useEffect(() => {
    setTrpcClient(buildTrpcClient);
  }, [accessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
