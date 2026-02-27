import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validators/product";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  const products = await db.product.findMany({ include: { images: true, category: true } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { images, ...rest } = parsed.data;
  const product = await db.product.create({
    data: {
      ...rest,
      slug: parsed.data.name.toLowerCase().replace(/\s+/g, "-"),
      images: { create: images.map((url) => ({ url, alt: parsed.data.name })) }
    }
  });

  return NextResponse.json(product, { status: 201 });
}
