"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";

export function NewsletterForm() {
  const [toast, setToast] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email");
    const res = await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });
    setToast(res.ok ? "Subscribed successfully" : "Subscription failed");
  }

  return (
    <div>
      <h4 className="text-sm font-semibold">Join our newsletter</h4>
      <form className="mt-3 flex gap-2" onSubmit={onSubmit}>
        <Input name="email" type="email" placeholder="you@example.com" required />
        <Button variant="luxe" type="submit">Join</Button>
      </form>
      {toast && <Toast message={toast} />}
    </div>
  );
}
