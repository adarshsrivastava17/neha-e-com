import { NextResponse } from "next/server";
import { razorpay } from "@/lib/payments/razorpay";

export async function POST(req: Request) {
  const { amount, receipt } = await req.json();
  const order = await razorpay.orders.create({ amount, currency: "INR", receipt });
  return NextResponse.json(order);
}
