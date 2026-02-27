import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("lumiere_session")?.value;

  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/auth/login", req.url));
    try {
      const payload = verifyJwt(token);
      if (payload.role !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  if (req.method !== "GET" && pathname.startsWith("/api")) {
    const csrf = req.headers.get("x-csrf-token");
    if (!csrf && !pathname.includes("webhook")) {
      return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"]
};
