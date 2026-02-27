import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/payments/stripe";
import { env } from "@/lib/env";
import { db } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/mail/transporter";

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const event = stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.success_url?.split("orderId=")[1];
    if (orderId) {
      const order = await db.order.update({ where: { id: orderId }, data: { status: "PAID", paymentStatus: "paid" }, include: { user: true } });
      await db.payment.upsert({
        where: { orderId },
        update: { provider: "STRIPE", providerPaymentId: session.payment_intent?.toString(), amountInCents: order.totalInCents, status: "paid" },
        create: { orderId, provider: "STRIPE", providerPaymentId: session.payment_intent?.toString(), amountInCents: order.totalInCents, status: "paid" }
      });
      await sendOrderConfirmation(order.user.email, order.orderNumber);
    }
  }

  return NextResponse.json({ received: true });
}
