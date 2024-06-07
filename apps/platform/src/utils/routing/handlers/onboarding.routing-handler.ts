import { NextRequest, NextResponse } from "next/server";
import { Session } from "~/trpc/types";
import { computeOnboardingPath } from "../../helpers";
import { Routes } from "../routes";

export function onboardingRoutingHandler({
  request,
  session,
}: {
  request: NextRequest;
  session: Session;
}): NextResponse {
  const onboardingStatusToPath = computeOnboardingPath(session.profile.onboardingStatus);
  const requestedPathname = request.nextUrl.pathname;

  if (requestedPathname === onboardingStatusToPath) {
    return NextResponse.next();
  }

  const hasNotCompletedOnboarding = session.profile.onboardingStatus !== "COMPLETED";
  if (hasNotCompletedOnboarding) {
    const onboarding = new URL(onboardingStatusToPath, request.nextUrl);
    return NextResponse.redirect(onboarding);
  }

  const dashboard = new URL(Routes.Dashboard, request.nextUrl);
  return NextResponse.redirect(dashboard);
}
