import Image from "next/image";
import Link from "next/link";
import { ProductWithImages } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductWithImages }) {
  const image = product.images[0]?.url;

  return (
    <Link href={`/products/${product.slug}`} className="group glass-card overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        {image && <Image src={image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />}
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-wide text-gold">{product.brand}</p>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-charcoal/70">{formatCurrency(product.priceInCents)}</p>
      </div>
    </Link>
  );
}
