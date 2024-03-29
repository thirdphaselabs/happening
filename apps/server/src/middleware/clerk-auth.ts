import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { environment } from "../environment";
import { z } from "zod";
import { userPublicMetadataSchema } from "../modules/user-metadata/user-metadata.service";

const clerkJwtPayloadSchema = z.object({
  sub: z.string(),
  sid: z.string(),
  metadata: userPublicMetadataSchema,
});

export function ClerkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies["__session"];

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
      console.log({ decoded });
      const clerkJwtPayload = clerkJwtPayloadSchema.parse(decoded);
      req.auth = {
        userId: clerkJwtPayload.sub,
        sessionId: clerkJwtPayload.sid,
        role: clerkJwtPayload.metadata.role,
        onboardingComplete: clerkJwtPayload.metadata.onboardingComplete,
        onboardingStep: clerkJwtPayload.metadata.onboardingStep,
      };
    }
  } catch (error) {}

  next();
}
