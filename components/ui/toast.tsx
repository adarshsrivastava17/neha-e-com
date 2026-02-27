"use client";

import { useEffect, useState } from "react";

export function Toast({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return <div className="fixed bottom-4 right-4 rounded-xl bg-charcoal px-4 py-3 text-sm text-white shadow-luxe">{message}</div>;
}
