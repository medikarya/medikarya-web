// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)"
]);

const isAuthRoute = createRouteMatcher([
  "/login(.*)",
  "/signup(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // Measure how long Clerk auth() takes to help diagnose latency
  const start = Date.now();
  const { userId } = await auth();
  const durationMs = Date.now() - start;
  try {
    // Log minimal info for diagnostics; hosting logs will show this
    // Avoid logging sensitive data — only path and duration
    // eslint-disable-next-line no-console
    console.log(`[middleware] path=${req.nextUrl?.pathname || req.url} clerkAuthMs=${durationMs}`);
  } catch (e) {
    // swallow logging errors
  }

  // Protect dashboard routes - redirect unauthenticated users to login
  if (isProtectedRoute(req)) {
    if (!userId) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle authenticated users trying to access auth pages
  if (isAuthRoute(req) && userId) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }
});

export const config = {
  matcher: [
    // Only run middleware for auth and protected routes and API endpoints
    "/dashboard(.*)",
    "/login(.*)",
    "/signup(.*)",
    "/(api|trpc)(.*)",
  ],
};
