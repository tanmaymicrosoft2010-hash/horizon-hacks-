import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const key = () => new TextEncoder().encode(process.env.JWT_SECRET);
export async function setSession(uid) {
  const t = await new SignJWT({ uid }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(key());
  (await cookies()).set("hh", t, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 604800 });
}
export async function clearSession() { (await cookies()).delete("hh"); }
export async function sessionUid() {
  try {
    const t = (await cookies()).get("hh")?.value;
    return t ? (await jwtVerify(t, key())).payload.uid : null;
  } catch { return null; }
}
