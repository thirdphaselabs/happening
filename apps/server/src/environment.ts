import z from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string().trim().min(1),
  CLERK_SECRET_KEY: z.string().trim().min(1),
  CLERK_PEM_PUBLIC_KEY: z.string().trim().min(1),
  WORKOS_API_KEY: z.string().trim().min(1),
  WORKOS_CLIENT_ID: z.string().trim().min(1),
  WORKOS_COOKIE_PASSWORD: z.string().trim().min(1),
  WORKOS_WEBHOOK_SECRET: z.string().trim().min(1),
  APP_URL: z.string().trim().min(1),
  API_URL: z.string().trim().min(1),
  STRIPE_SECRET_KEY: z.string().trim().min(1),
});

export function initEnv() {
  const env = envSchema.parse(process.env);
  return env;
}

export const environment = envSchema.parse(process.env);
