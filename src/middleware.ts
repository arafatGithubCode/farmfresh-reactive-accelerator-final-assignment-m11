import NextAuth, { type NextAuthConfig } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import { LOGIN, PUBLIC_ROUTE, ROOT } from "./libs/route";

const { auth } = NextAuth(authConfig as NextAuthConfig);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const isPublicRoute =
    PUBLIC_ROUTE.some((route) => pathname.startsWith(route)) ||
    pathname === ROOT;

  if (isPublicRoute) return NextResponse.next();

  if (pathname.startsWith("/api")) return NextResponse.next();

  const isAuthenticated = !!auth;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
