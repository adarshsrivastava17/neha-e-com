import { NextResponse } from "next/server";
import { stripe } from "@/lib/payments/stripe";

export async function POST(req: Request) {
  const { amount } = await req.json();
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true }
  });
  return NextResponse.json({ clientSecret: intent.client_secret });
}
