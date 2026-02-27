import Link from "next/link";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-blush bg-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Lumière Cosmetics</h3>
          <p className="mt-3 text-sm text-charcoal/70">Luxury beauty crafted with clean science and elegance.</p>
        </div>
        <div className="space-y-2 text-sm">
          <Link href="/privacy">Privacy Policy</Link><br />
          <Link href="/terms">Terms & Conditions</Link><br />
          <Link href="/contact">Contact</Link>
        </div>
        <NewsletterForm />
      </div>
    </footer>
  );
}
