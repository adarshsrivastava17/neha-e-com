import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validators/auth";
import { hashPassword } from "@/lib/security/password";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await db.user.create({ data: { ...parsed.data, passwordHash } });

  return NextResponse.json({ userId: user.id }, { status: 201 });
}
