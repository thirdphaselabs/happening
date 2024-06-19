import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Application } from "express";

import swaggerUi from "swagger-ui-express";
import "./types/types";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import { PlaventiSession, authController } from "./modules/auth/auth.controller";
import { paymentsController } from "./modules/payments/payments.controller";
import { authWebhooks } from "./modules/auth/auth.webhooks";
import { imageController } from "./controllers/image.controller";
import { environment, initEnv } from "./environment";
import { createContext } from "./trpc/context";
import { openApiDocument } from "./trpc/openapi";
import { appRouter } from "./trpc/routers/root";
import { SessionWithOrg } from "./types/types";

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

app.use("/api/webhooks/payments", paymentsController);

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const corsOptions = {
  origin: [environment.APP_URL, "https://plaventi.dev"],
  credentials: true,
};

app
  .use(cors(corsOptions))
  .options("*", cors(corsOptions))
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
