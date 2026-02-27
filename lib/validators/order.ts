import { z } from "zod";

export const checkoutSchema = z.object({
  items: z.array(z.object({ productId: z.string().cuid(), quantity: z.number().min(1).max(10) })).min(1),
  addressId: z.string().cuid(),
  couponCode: z.string().optional(),
  paymentMethod: z.enum(["STRIPE", "RAZORPAY"])
});
