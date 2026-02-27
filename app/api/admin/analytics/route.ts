import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [orders, users, products] = await Promise.all([db.order.count(), db.user.count(), db.product.count()]);
  return NextResponse.json({ orders, users, products });
}
