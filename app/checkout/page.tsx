"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  const { items, remove, update } = useCart();
  const [loading, setLoading] = useState(false);

  async function startCheckout(paymentMethod: "STRIPE" | "RAZORPAY") {
    setLoading(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ items, addressId: "cm0addressdemo", paymentMethod })
    });
    const data = await res.json();
    if (data.checkoutUrl) window.location.href = data.checkoutUrl;
    setLoading(false);
  }

  return (
    <section className="container-shell py-12">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="glass-card p-6">
          <h2 className="font-medium">Cart Items</h2>
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between border-b border-blush pb-3">
                <p className="text-sm">{item.productId}</p>
                <div className="flex items-center gap-2">
                  <Input type="number" min={1} className="w-20" value={item.quantity} onChange={(e) => update(item.productId, Number(e.target.value))} />
                  <button className="text-xs text-red-500" onClick={() => remove(item.productId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="glass-card space-y-4 p-6">
          <Input placeholder="Coupon code" />
          <Button onClick={() => startCheckout("STRIPE")} disabled={loading || items.length === 0} className="w-full">Pay with Stripe</Button>
          <Button onClick={() => startCheckout("RAZORPAY")} variant="outline" disabled={loading || items.length === 0} className="w-full">Pay with Razorpay</Button>
        </aside>
      </div>
    </section>
  );
}
