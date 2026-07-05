import { NextResponse, type NextRequest } from "next/server";
import { verifySession, ADMIN_COOKIE } from "@/lib/auth";

/**
 * Guards /admin/* and /api/admin/* behind the owner session cookie.
 * The login page and login/logout endpoints are always reachable.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const authed = await verifySession(token, secret);

  const isLoginPage = pathname === "/admin/login";
  const isAuthApi =
    pathname === "/api/admin/login" || pathname === "/api/admin/logout";

  const guarded =
    (pathname.startsWith("/admin") && !isLoginPage) ||
    (pathname.startsWith("/api/admin") && !isAuthApi);

  if (guarded && !authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Already signed in → skip the login page
  if (isLoginPage && authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
