import nodemailer from "nodemailer";
import { env } from "@/lib/env";

export const mailer = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  }
});

export async function sendOrderConfirmation(to: string, orderNumber: string) {
  return mailer.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: `Order Confirmed - ${orderNumber}`,
    html: `<h1>Thank you for shopping with Lumière</h1><p>Your order <strong>${orderNumber}</strong> is confirmed.</p>`
  });
}
