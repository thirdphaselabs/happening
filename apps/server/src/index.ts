import cors from "cors";
import express, { Application } from "express";
import { json, urlencoded } from "body-parser";

import "./types/types";
import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./trpc/openapi";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import { appRouter } from "./trpc/routers/root";
import { createContext } from "./trpc/context";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { initEnv } from "./environment";
import { UserRole } from "@plaventi/database";
import { ClerkAuth } from "./middleware/clerk-auth";
import { OnboardingStep } from "./types/types";

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId?: string;
        sessionId?: string;
        role?: UserRole;
        onboardingComplete?: boolean;
        onboardingStep?: OnboardingStep;
        organisationId?: string;
      };
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

app.use(ClerkAuth);

// Handle incoming tRPC requests
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

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
