import { generateOpenApiDocument } from "trpc-openapi";
import { OpenAPIV3 } from "openapi-types";
import { appRouter } from "./routers/root";

export const openApiDocument: OpenAPIV3.Document = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: "http://localhost:3002/api",
});
