import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "@ESPERANÇA:T";
const LOGIN_PAGE = "/login";
const DEFAULT_ADMIN_PAGE = "/inicio";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === LOGIN_PAGE;

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL(DEFAULT_ADMIN_PAGE, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/inicio/:path*",
    "/perfil/:path*",
    "/parceiros/:path*",
    "/voluntarios/:path*",
    "/login",
  ],
};
