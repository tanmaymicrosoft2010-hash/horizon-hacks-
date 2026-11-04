import { ObjectId } from "mongodb";
import { db } from "@/lib/db";
import { sessionUid } from "@/lib/auth";
export async function POST(req) {
  const uid = await sessionUid();
  if (!uid) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const code = ((await req.json()).code || "").trim().toUpperCase();
  if (!/^[0-9A-F]{6}$/.test(code)) return Response.json({ error: "Enter a valid 6-digit hex code" }, { status: 400 });
  const d = await db();
  const _id = new ObjectId(uid);
  const user = await d.collection("users").findOne({ _id });
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (user.teamId) return Response.json({ error: "You are already in a team" }, { status: 400 });
  const team = await d.collection("teams").findOne({ code });
  if (!team) return Response.json({ error: "No team with that code" }, { status: 404 });
  await d.collection("teams").updateOne({ _id: team._id }, { $addToSet: { members: _id } });
  await d.collection("users").updateOne({ _id }, { $set: { teamId: team._id } });
  return Response.json({ ok: true });
}
