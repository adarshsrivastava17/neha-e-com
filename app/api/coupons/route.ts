import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { code, subtotal } = await req.json();
  const coupon = await db.coupon.findUnique({ where: { code } });
  if (!coupon || !coupon.active) return NextResponse.json({ valid: false }, { status: 404 });
  if (coupon.minCartValue && subtotal < coupon.minCartValue) return NextResponse.json({ valid: false, reason: "Minimum amount not met" }, { status: 400 });
  const discount = coupon.discountType === "PERCENT" ? Math.round((subtotal * coupon.discountValue) / 100) : coupon.discountValue;
  return NextResponse.json({ valid: true, discount });
}
