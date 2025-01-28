import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./app/login/_actions/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const user = await getCurrentUser();

  // Protect the /admin route and its children
  if (pathname.startsWith("/admin")) {
    if (!user) {
      // Redirect to login if no user is found
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Prevent authenticated users from accessing the /login route
  if (pathname === "/login") {
    if (user) {
      // Redirect authenticated users to the home page or dashboard
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Define the routes where the middleware should run
export const config = {
  matcher: ["/admin/:path*", "/login"], // Apply to /admin/* and /login
};
