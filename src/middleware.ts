import { authConfig } from "@/auth.config";
import NextAuth, { type NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

import { LOGIN, PUBLIC_ROUTE, ROOT } from "./libs/route";

const { auth } = NextAuth(authConfig as NextAuthConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  console.log(isAuthenticated, nextUrl.pathname, "midd");

  const isPublicRoute =
    PUBLIC_ROUTE.some((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  console.log({ isPublicRoute }, "isPublicRoute");

  if (!isAuthenticated && !isPublicRoute)
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
