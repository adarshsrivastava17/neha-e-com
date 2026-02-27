const faqs = [
  { q: "Are products cruelty-free?", a: "Yes, all formulations are cruelty-free and dermatologically tested." },
  { q: "How long is shipping?", a: "Standard shipping takes 3-6 business days." }
];

export default function FaqPage() {
  return (
    <section className="container-shell py-16">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <article key={faq.q} className="glass-card p-5">
            <h2 className="font-medium">{faq.q}</h2>
            <p className="mt-2 text-sm text-charcoal/70">{faq.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
