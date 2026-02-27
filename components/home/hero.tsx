"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container-shell py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">New Era of Beauty</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Luxury Cosmetics Crafted for Timeless Radiance</h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-charcoal/70 md:text-base">
          Discover curated skincare, makeup, haircare, and fragrances designed for performance and elegance.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="luxe"><Link href="/products">Shop Collection</Link></Button>
          <Button asChild variant="outline"><Link href="/about">Our Story</Link></Button>
        </div>
      </motion.div>
    </section>
  );
}
