import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { environment } from "../environment";
import { OnboardingStep } from "../types/types";

const clerkJwtPayloadSchema = z.object({
  sub: z.string(),
  sid: z.string(),
  org_id: z.string().optional(),
  metadata: z
    .object({
      onboardingComplete: z.boolean().optional(),
      onboardingStep: z.nativeEnum(OnboardingStep).optional(),
    })
    .optional(),
});

export function ClerkAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization?.replace("Bearer ", "");
  const cookie = req.cookies["__session"];

  const token = header ?? cookie;

  if (token === undefined) {
    req.auth = {
      sessionId: undefined,
      userId: undefined,
    };
    next();
    return;
  }

  try {
    if (token) {
      const decoded = jwt.verify(token, environment.CLERK_PEM_PUBLIC_KEY);
      const clerkJwtPayload = clerkJwtPayloadSchema.parse(Object.assign(decoded, {}));
      req.auth = {
        userId: clerkJwtPayload.sub,
        sessionId: clerkJwtPayload.sid,
        organisationId: clerkJwtPayload.org_id,
        onboardingComplete: clerkJwtPayload.metadata?.onboardingComplete,
        onboardingStep: clerkJwtPayload.metadata?.onboardingStep,
      };
    }
  } catch (error) {
    console.error("Error parsing Clerk JWT", error);
  }

  next();
}
