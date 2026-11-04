import { randomBytes } from "crypto";
import { ObjectId } from "mongodb";
import { db } from "@/lib/db";
import { sessionUid } from "@/lib/auth";
export async function POST(req) {
  const uid = await sessionUid();
  if (!uid) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const name = ((await req.json()).name || "").trim();
  if (name.length < 2 || name.length > 40) return Response.json({ error: "Team name must be 2-40 characters" }, { status: 400 });
  const d = await db();
  const _id = new ObjectId(uid);
  const user = await d.collection("users").findOne({ _id });
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (user.teamId) return Response.json({ error: "You are already in a team" }, { status: 400 });
  for (let i = 0; i < 20; i++) {
    const code = randomBytes(3).toString("hex").toUpperCase();
    try {
      const r = await d.collection("teams").insertOne({ name, code, ownerId: _id, members: [_id], createdAt: new Date() });
      await d.collection("users").updateOne({ _id }, { $set: { teamId: r.insertedId } });
      return Response.json({ ok: true, code });
    } catch (e) { if (e.code !== 11000) throw e; }
  }
  return Response.json({ error: "Could not generate a unique code, try again" }, { status: 500 });
}
