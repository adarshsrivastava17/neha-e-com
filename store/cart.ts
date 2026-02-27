"use client";

import { create } from "zustand";

type CartItem = { productId: string; quantity: number };

type CartState = {
  items: CartItem[];
  add: (productId: string) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (productId) =>
    set((state) => {
      const existing = state.items.find((item) => item.productId === productId);
      if (existing) {
        return { items: state.items.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)) };
      }
      return { items: [...state.items, { productId, quantity: 1 }] };
    }),
  update: (productId, quantity) => set((state) => ({ items: state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)) })),
  remove: (productId) => set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
  clear: () => set({ items: [] })
}));
