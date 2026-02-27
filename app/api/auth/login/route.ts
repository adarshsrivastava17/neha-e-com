import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validators/auth";
import { comparePassword } from "@/lib/security/password";
import { signJwt } from "@/lib/auth/jwt";
import { authCookieName } from "@/lib/auth/session";
import { rateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const rate = rateLimit(`login:${ip}`, 8, 60_000);
  if (!rate.success) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });

  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await comparePassword(parsed.data.password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signJwt({ userId: user.id, email: user.email, role: user.role });
  (await cookies()).set(authCookieName, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });

  return NextResponse.json({ success: true });
}
