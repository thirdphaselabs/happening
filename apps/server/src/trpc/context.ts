import { prisma } from "@template/database";
import type * as trpc from "@trpc/server";
import { initTRPC } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";
import SuperJSON from "superjson";
import { OpenApiMeta } from "trpc-openapi";
import { ZodError } from "zod";

export const createContextInner = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const event = await prisma.event.findFirst();

  if (!event) {
    return {
      req,
      res,
      event: null,
    };
  }

  return {
    req,
    res,
    event,
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
