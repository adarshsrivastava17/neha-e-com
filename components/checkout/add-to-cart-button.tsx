"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";

export function AddToCartButton({ productId }: { productId: string }) {
  const add = useCart((s) => s.add);
  return <Button variant="luxe" onClick={() => add(productId)}>Add to Cart</Button>;
}
