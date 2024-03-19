import z from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string().trim().min(1),
});

export function initEnv() {
  const env = envSchema.parse(process.env);
  return env;
}

export const environment = envSchema.parse(process.env);
