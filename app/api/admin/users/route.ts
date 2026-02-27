import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const users = await db.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } });
  return NextResponse.json(users);
}
