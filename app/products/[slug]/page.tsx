import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/checkout/add-to-cart-button";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await db.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, reviews: true, category: true }
  });

  if (!product) notFound();

  const related = await db.product.findMany({ where: { categoryId: product.categoryId, NOT: { id: product.id } }, take: 4, include: { images: true } });

  return (
    <section className="container-shell py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="grid gap-3">
          {product.images.map((image) => (
            <div key={image.id} className="relative aspect-square overflow-hidden rounded-2xl border border-blush">
              <Image src={image.url} alt={image.alt} fill className="object-cover transition hover:scale-110" />
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm uppercase tracking-wider text-gold">{product.category.name}</p>
          <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-sm text-charcoal/70">{product.description}</p>
          <p className="mt-5 text-2xl font-semibold">{formatCurrency(product.priceInCents)}</p>
          <p className="mt-2 text-sm">{product.stock > 0 ? "In stock" : "Out of stock"}</p>
          <div className="mt-6"><AddToCartButton productId={product.id} /></div>
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-xl font-semibold">Related products</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <article key={item.id} className="glass-card p-4">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-charcoal/70">{formatCurrency(item.priceInCents)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
