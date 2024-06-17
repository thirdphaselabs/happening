import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/actions";
import { computeOnboardingPath } from "./utils/helpers";
import { Routes } from "./utils/routing/routes";
import { onboardingRoutingHandler } from "./utils/routing/handlers/onboarding.routing-handler";

const publicRoutes = ["/login", "/discovery", "/sign-up", "/auth"];

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const requestedPathname = request.nextUrl.pathname;

  if (publicRoutes.includes(requestedPathname)) {
    return NextResponse.next();
  }

  const isEventPage = requestedPathname.startsWith("/event/");

  if (isEventPage) {
    return NextResponse.next();
  }

  if (!session || !session.profile) {
    const loginUrl = new URL(Routes.Login, request.nextUrl);
    return NextResponse.redirect(loginUrl);
  }

  console.log({ requestedPathname });

  if (requestedPathname.startsWith("onboarding") || session.profile.onboardingStatus !== "COMPLETED") {
    return onboardingRoutingHandler({ request, session });
  }

  return NextResponse.next();
}

// export default authMiddleware({
//   // Allow signed out users to access the specified routes:
//   publicRoutes: ["/test", "/developer", "/sso-callback", "/login", "/new", "/test"],
//   afterAuth: async (auth, req: NextRequest) => {
//     const { userId, sessionClaims } = auth;

//     if (req.nextUrl.pathname === "/developer") {
//       return NextResponse.next();
//     }

//     const onboardingStepRaw = sessionClaims?.metadata?.onboardingStep;
//     const onboardingPath = computeOnboardingPath(onboardingStepRaw);

//     const rnadmom = Math.random() * 100;

//     if (userId && req.nextUrl.pathname === onboardingPath) {
//       const headers = new Headers(req.headers);
//       headers.set("x-pathname", new URL(req.url).pathname);
//       return NextResponse.next({
//         headers,
//       });
//     }

//     // User isn't signed in and the route is private -- redirect to sign-in
//     if (!userId && !auth.isPublicRoute) return redirectToSignIn({ returnBackUrl: req.url });

//     // Catch users who doesn't have `onboardingComplete: true` in PublicMetata
//     // Redirect them to the /onboading out to complete onboarding
//     if (userId && !sessionClaims?.metadata?.onboardingComplete) {
//       const onboardingUrl = new URL(onboardingPath, req.url);
//       return NextResponse.redirect(onboardingUrl);
//     }

//     // user is signed in and tries to access sign-in page
//     if (userId && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")) {
//       const url = new URL("/", req.url);
//       return NextResponse.redirect(url);
//     }
//     // User is logged in and the route is protected - let them view.
//     if (userId && !auth.isPublicRoute) {
//       return NextResponse.next();
//     }

//     // If the route is public, anyone can view it.
//     if (auth.isPublicRoute) return NextResponse.next();
//   },
//   // Prevent the specified routes from accessing
//   // authentication information:
//   // ignoredRoutes: ['/no-auth-in-this-route'],
// });

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.

    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
