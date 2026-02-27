import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId, rating, title, comment } = await req.json();
  const review = await db.review.create({ data: { userId: session.userId, productId, rating, title, comment } });
  return NextResponse.json(review, { status: 201 });
}
