import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";

export default async function ProductsPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q ?? "";
  const products = await db.product.findMany({
    where: query ? { name: { contains: query, mode: "insensitive" } } : undefined,
    include: { images: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="container-shell py-12">
      <h1 className="mb-6 text-3xl font-semibold">Shop Cosmetics</h1>
      <ProductFilters />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
