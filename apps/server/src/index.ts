import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Application } from "express";

import swaggerUi from "swagger-ui-express";
import "./types/types";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import { PlaventiSession, authController } from "./modules/auth/auth.controller";
import { authWebhooks } from "./modules/auth/auth.webhooks";
import { imageController } from "./controllers/image.controller";
import { environment, initEnv } from "./environment";
import { createContext } from "./trpc/context";
import { openApiDocument } from "./trpc/openapi";
import { appRouter } from "./trpc/routers/root";
import { SessionWithOrg } from "./types/types";
import WorkOS from "@workos-inc/node";

declare global {
  namespace Express {
    interface Request {
      session: PlaventiSession;
      orgSession: SessionWithOrg;
    }
  }
}

initEnv();

const port: number = 3002 as const;

const app: Application = express();

app
  .use(cors({ origin: true, credentials: true }))
  .disable("x-powered-by")
  .use(cookieParser())
  .use(urlencoded({ extended: true }))
  .use(json());

app.get("/health", (_req, res) => {
  res.send("ok");
});

// app.use(ClerkAuth);

// Handle incoming tRPC requests
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use("/api/auth", authController);
app.use("/api/image", imageController);
app.use("/api/webhooks/auth", authWebhooks);

// Handle incoming OpenAPI requests
app.use("/api", createOpenApiExpressMiddleware({ router: appRouter, createContext }));

// Serve Swagger UI with our OpenAPI schema
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(openApiDocument));

// Server setup
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});

export type { AppRouter } from "./trpc/routers/root";
