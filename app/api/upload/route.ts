import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

export async function POST(req: Request) {
  const body = await req.json();
  const { imageBase64 } = body;
  const result = await cloudinary.uploader.upload(imageBase64, {
    folder: "lumiere-products"
  });
  return NextResponse.json({ url: result.secure_url });
}
