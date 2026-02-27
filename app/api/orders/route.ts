import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { checkoutSchema } from "@/lib/validators/order";
import { stripe } from "@/lib/payments/stripe";
import { razorpay } from "@/lib/payments/razorpay";
import { absoluteUrl } from "@/lib/utils";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const products = await db.product.findMany({ where: { id: { in: parsed.data.items.map((item) => item.productId) } } });
  const subtotal = parsed.data.items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    return acc + (product?.priceInCents ?? 0) * item.quantity;
  }, 0);
  const tax = Math.round(subtotal * 0.08);
  const shipping = subtotal > 7000 ? 0 : 499;
  const total = subtotal + tax + shipping;

  const order = await db.order.create({
    data: {
      orderNumber: `LUM-${Date.now()}`,
      userId: session.userId,
      addressId: parsed.data.addressId,
      subtotalInCents: subtotal,
      taxInCents: tax,
      shippingInCents: shipping,
      discountInCents: 0,
      totalInCents: total,
      items: {
        create: parsed.data.items.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          return { productId: item.productId, quantity: item.quantity, unitPriceInCents: product.priceInCents };
        })
      }
    }
  });

  if (parsed.data.paymentMethod === "STRIPE") {
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: absoluteUrl(`/checkout/success?orderId=${order.id}`),
      cancel_url: absoluteUrl("/checkout"),
      line_items: parsed.data.items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        return { quantity: item.quantity, price_data: { currency: "usd", unit_amount: product.priceInCents, product_data: { name: product.name } } };
      })
    });
    return NextResponse.json({ orderId: order.id, checkoutUrl: checkout.url });
  }

  const rzOrder = await razorpay.orders.create({ amount: total, currency: "INR", receipt: order.id });
  return NextResponse.json({ orderId: order.id, razorpayOrder: rzOrder });
}
