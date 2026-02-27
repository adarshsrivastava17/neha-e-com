"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";

export function ContactForm() {
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Message submitted. Our team will contact you shortly.");
  }

  return (
    <form className="space-y-4 glass-card p-6" onSubmit={submit}>
      <Input name="name" placeholder="Your Name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <textarea className="w-full rounded-xl border border-nude p-3 outline-none focus:border-gold" rows={5} name="message" placeholder="Message" required />
      <Button variant="luxe" type="submit">Send Message</Button>
      {message && <Toast message={message} />}
    </form>
  );
}
