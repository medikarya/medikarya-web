import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/admin(.*)"
]);

const isAuthRoute = createRouteMatcher([
    "/login(.*)",
    "/signup(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    // Don't redirect if this is a Clerk OAuth callback or internal route
    if (req.nextUrl.pathname.includes('/sso-callback') ||
        req.nextUrl.pathname.includes('/oauth') ||
        req.nextUrl.pathname.startsWith('/_next/') ||
        req.nextUrl.pathname.includes('.')) {
        return;
    }

    // Protect dashboard routes - redirect unauthenticated users to login
    if (isProtectedRoute(req)) {
        if (!userId) {
            const loginUrl = new URL("/login", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Redirect authenticated users away from auth pages to dashboard
    if (isAuthRoute(req) && userId) {
        const dashboardUrl = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboardUrl);
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
