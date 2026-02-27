import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/payments/razorpay";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();
  const valid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
  if (!valid) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  await db.order.update({ where: { id: orderId }, data: { status: "PAID", paymentStatus: "paid" } });
  await db.payment.upsert({
    where: { orderId },
    update: { provider: "RAZORPAY", providerPaymentId: razorpayPaymentId, status: "paid" },
    create: { orderId, provider: "RAZORPAY", providerPaymentId: razorpayPaymentId, amountInCents: 0, status: "paid" }
  });

  return NextResponse.json({ verified: true });
}
