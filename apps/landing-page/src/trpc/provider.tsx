"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "@plaventi/server";
import {
  httpBatchLink,
  loggerLink,
  unstable_httpBatchStreamLink as unstableHttpBatchLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import React, { useState } from "react";
import SuperJSON from "superjson";
import { getUrl } from "./utils/getUrl";

export const api = createTRPCReact<AppRouter>({});

export function TRPCReactProvider(props: { children: React.ReactNode; cookies: string }) {
  const [queryClient] = React.useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: getUrl(),
          fetch(url, options) {
            return fetch(url, {
              ...options,
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
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
