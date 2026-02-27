import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(20),
  priceInCents: z.number().int().positive(),
  compareAtPriceInCents: z.number().int().positive().optional(),
  stock: z.number().int().min(0),
  categoryId: z.string().cuid(),
  brand: z.string().min(2),
  skinType: z.string().optional(),
  images: z.array(z.string().url()).min(1),
  tags: z.array(z.string()).default([])
});
