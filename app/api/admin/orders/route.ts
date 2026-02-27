import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const orders = await db.order.findMany({ include: { items: true, user: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(orders);
}

export async function PATCH(req: Request) {
  const { id, status, trackingNumber } = await req.json();
  const order = await db.order.update({ where: { id }, data: { status, trackingNumber } });
  return NextResponse.json(order);
}
