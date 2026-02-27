import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "@/lib/env";

export const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET
});

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  const digest = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return digest === signature;
}
