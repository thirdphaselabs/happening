import type * as trpc from "@trpc/server";
import { initTRPC } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";
import SuperJSON from "superjson";
import { OpenApiMeta } from "trpc-openapi";
import { ZodError } from "zod";

export const createContextInner = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  // @ts-ignore
  const auth: WithAuthProp<Request> = req.auth;

  console.log("headers in context", JSON.stringify(req.headers, null, 2));

  const authHeader = req.headers["authorization"];
  const authCookie = req.cookies["wos-session"];
  const sessionToken = authCookie !== undefined && authCookie !== null ? authCookie : authHeader;

  console.log("context", {
    sessionToken,
    authHeader,
    authCookie,
  });

  return {
    req,
    res,
    sessionToken,
  };
};

export const t = initTRPC
  .context<typeof createContext>()
  .meta<OpenApiMeta>()
  .create({
    transformer: SuperJSON,
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  });

export const createTRPCRouter = t.router;

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(opts: trpcExpress.CreateExpressContextOptions): Promise<Context> {
  const contextValue = await createContextInner(opts);

  return contextValue;
}
