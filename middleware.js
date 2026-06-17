import { NextResponse } from "next/server";

// Verify admin_session cookie to protect /admin path
export function middleware(request) {
  const session = request.cookies.get("admin_session");

  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
