"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [toast, setToast] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch(`/api/auth/${mode}`, { method: "POST", body: JSON.stringify(payload) });
    setToast(res.ok ? `${mode} successful` : `${mode} failed`);
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-4 glass-card p-6">
      <h1 className="text-2xl font-semibold capitalize">{mode}</h1>
      {mode === "register" && <Input name="name" placeholder="Full name" required />}
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Button type="submit" variant="luxe" className="w-full">Continue</Button>
      {toast && <Toast message={toast} />}
    </form>
  );
}
