import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
export async function POST(req) {
  const b = await req.json();
  const user = await (await db()).collection("users").findOne({ username: String(b.email || "").trim().toLowerCase() });
  if (!user || !(await bcrypt.compare(String(b.password || ""), user.hash))) return Response.json({ error: "Invalid email or password" }, { status: 401 });
  await setSession(user._id.toString());
  return Response.json({ ok: true });
}