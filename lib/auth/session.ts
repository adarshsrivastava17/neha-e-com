import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth/jwt";

const COOKIE_KEY = "lumiere_session";

export async function getSession() {
  const token = (await cookies()).get(COOKIE_KEY)?.value;
  if (!token) return null;
  try {
    return verifyJwt(token);
  } catch {
    return null;
  }
}

export const authCookieName = COOKIE_KEY;
