# Lumière Cosmetics - Production Ready E-commerce Platform

A full-stack Next.js 15 (App Router) cosmetic e-commerce platform with TypeScript, Tailwind CSS, Prisma/PostgreSQL, JWT auth, Stripe + Razorpay payments, Cloudinary image storage, admin panel, and secure API architecture.

## Features
- Luxury responsive storefront with animations (Framer Motion)
- Product search/filter/sort + detailed product page
- Cart + checkout + coupons + tax/shipping calculation
- Stripe checkout + Payment Intents (cards, Apple Pay, Google Pay via Stripe)
- Razorpay order + signature verification flow (UPI/netbanking/wallets)
- JWT authentication, role-based access control, bcrypt password hashing
- Admin dashboard for analytics, orders, users, products
- Prisma schema with Users, Products, Categories, Orders, OrderItems, Reviews, Addresses, Coupons, Payments, Wishlist
- Cloudinary upload API
- Email order confirmation (Nodemailer)
- API rate limiting + CSRF header checks + protected routes
- SEO metadata + image optimization + reusable component architecture

## Project Structure
```txt
app/
  api/
  admin/
  auth/
  checkout/
  products/
  profile/
components/
lib/
  auth/ payments/ security/ validators/ mail/
prisma/
store/
types/
```

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Copy env file
   ```bash
   cp .env.example .env
   ```
3. Start PostgreSQL (local/docker) and update `DATABASE_URL`.
4. Generate Prisma client + migrate + seed
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   npm run seed
   ```
5. Run development server
   ```bash
   npm run dev
   ```

## Stripe Setup
- Create Stripe account and set keys in `.env`.
- Register webhook endpoint: `POST /api/payments/stripe-webhook`.
- Add `STRIPE_WEBHOOK_SECRET` from Stripe dashboard.

## Razorpay Setup
- Create Razorpay credentials and fill `.env`.
- Frontend receives order details from `/api/payments/razorpay-order`.
- Verify callbacks via `/api/payments/razorpay-verify`.

## Security Notes
- Send `x-csrf-token` header for non-GET `/api/*` requests.
- JWT token stored in HTTP-only cookie `lumiere_session`.
- Rate-limiting applied for login route.
- Passwords hashed with bcrypt.

## Deployment (Vercel)
1. Push repository to GitHub.
2. Import into Vercel.
3. Configure environment variables from `.env.example`.
4. Provision PostgreSQL (Neon/Supabase/RDS).
5. Run Prisma migrations during build/deploy.

## Performance Strategy
- SSR for dynamic pages (products/profile/admin).
- Static optimization for content pages.
- Next/Image + remotePatterns.
- Component-level lazy loading support and compact client bundles.

## Admin Access (Seed)
- Email: `admin@lumiere.com`
- Password: `Admin@1234`
