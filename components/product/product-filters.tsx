"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export function ProductFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      const sp = new URLSearchParams(params.toString());
      if (q) sp.set("q", q);
      else sp.delete("q");
      router.push(`/products?${sp.toString()}`);
    }, 350);
    return () => clearTimeout(t);
  }, [q, params, router]);

  return (
    <div className="glass-card mb-6 grid gap-3 p-4 md:grid-cols-4">
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" />
      <select className="rounded-xl border border-nude p-2" defaultValue="">
        <option value="">All skin types</option>
        <option value="all">All</option>
        <option value="dry">Dry</option>
        <option value="oily">Oily</option>
      </select>
      <select className="rounded-xl border border-nude p-2" defaultValue="">
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
      <select className="rounded-xl border border-nude p-2" defaultValue="">
        <option value="">Rating</option>
        <option value="4">4★ & up</option>
      </select>
    </div>
  );
}
