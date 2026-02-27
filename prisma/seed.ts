import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/security/password";

const prisma = new PrismaClient();

async function main() {
  const adminPass = await hashPassword("Admin@1234");

  const skincare = await prisma.category.upsert({
    where: { slug: "skincare" },
    update: {},
    create: { name: "Skincare", slug: "skincare", description: "Hydration and glow essentials" }
  });

  await prisma.user.upsert({
    where: { email: "admin@lumiere.com" },
    update: {},
    create: {
      name: "Store Admin",
      email: "admin@lumiere.com",
      passwordHash: adminPass,
      role: "ADMIN"
    }
  });

  await prisma.product.upsert({
    where: { slug: "rose-glow-serum" },
    update: {},
    create: {
      name: "Rose Glow Serum",
      slug: "rose-glow-serum",
      description: "A niacinamide and rosehip powered serum for radiant skin.",
      priceInCents: 4200,
      compareAtPriceInCents: 5200,
      stock: 120,
      brand: "Lumière",
      skinType: "All",
      categoryId: skincare.id,
      isFeatured: true,
      images: {
        create: [{ url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be", alt: "Rose Glow Serum" }]
      }
    }
  });
}

main().finally(async () => prisma.$disconnect());
