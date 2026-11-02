import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { REDIRECT_COOKIE } from "./lib/redirect";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  if (user) {
    const response = NextResponse.next();
    response.cookies.delete(REDIRECT_COOKIE);
    return response;
  }

  const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const registerUrl = new URL("/register", request.url);
  registerUrl.searchParams.set("redirectTo", redirectTo);

  const response = NextResponse.redirect(registerUrl);
  response.cookies.set(REDIRECT_COOKIE, redirectTo, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}

export const config = {
  matcher: ["/add-studio", "/my-bookings", "/my-listings", "/studio-wishlist"],
};
