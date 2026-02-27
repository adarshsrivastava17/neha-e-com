import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  return (
    <section className="container-shell py-16">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <p className="mt-2 text-sm text-charcoal/70">We would love to hear from you.</p>
      <div className="mt-8 max-w-xl"><ContactForm /></div>
    </section>
  );
}
