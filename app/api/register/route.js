import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
const bad = (m, s = 400) => Response.json({ error: m }, { status: s });
export async function POST(req) {
  const b = await req.json();
  const name = String(b.name || "").trim().replace(/\s+/g, " ");
  const age = Number(b.age);
  const email = String(b.email || "").trim().toLowerCase();
  const password = String(b.password || "");
  if (name.length < 2 || name.length > 60) return bad("Enter your name (2-60 characters)");
  if (!Number.isInteger(age) || age < 13 || age > 120) return bad("Age must be a whole number between 13 and 120");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return bad("Enter a valid email address");
  if (password.length < 8) return bad("Password must be at least 8 characters");
  if (password !== b.confirm) return bad("Passwords do not match");
  const d = await db();
  try {
    const r = await d.collection("users").insertOne({ name, age, username: email, hash: await bcrypt.hash(password, 12), teamId: null, createdAt: new Date() });
    await setSession(r.insertedId.toString());
    return Response.json({ ok: true });
  } catch (e) {
    if (e.code === 11000) return bad("An account with this email already exists", 409);
    throw e;
  }
}