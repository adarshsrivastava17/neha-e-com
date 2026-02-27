import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "If an account exists, a reset email has been sent." });
}
