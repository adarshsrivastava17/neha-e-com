"use client";

import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-blush bg-white/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-[0.2em] text-charcoal">LUMIÈRE</Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/checkout" className="rounded-full p-2 hover:bg-blush"><ShoppingBag size={18} /></Link>
          <button className="rounded-full p-2 hover:bg-blush md:hidden" onClick={() => setOpen((p) => !p)}><Menu size={18} /></button>
        </div>
      </div>
      {open && (
        <div className="border-t border-blush bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
