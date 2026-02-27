import jwt from "jsonwebtoken";
import { env } from "@/lib/env";

export type JwtPayload = {
  userId: string;
  role: "USER" | "ADMIN";
  email: string;
};

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
