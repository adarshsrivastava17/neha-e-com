import { Hero } from "@/components/home/hero";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/product-card";

export default async function HomePage() {
  const products = await db.product.findMany({ include: { images: true }, take: 8, orderBy: { createdAt: "desc" } });

  return (
    <>
      <Hero />
      <section className="container-shell pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Trending Products</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </>
  );
}
