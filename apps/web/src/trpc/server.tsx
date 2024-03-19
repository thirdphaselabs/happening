import { AppRouter } from "@template/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { getUrl } from "./utils/getUrl";

export const serverClient = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});
