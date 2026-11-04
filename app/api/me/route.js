import { ObjectId } from "mongodb";
import { db } from "@/lib/db";
import { sessionUid } from "@/lib/auth";
export async function GET() {
  const uid = await sessionUid();
  if (!uid) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const d = await db();
  const user = await d.collection("users").findOne({ _id: new ObjectId(uid) });
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  let team = null;
  if (user.teamId) {
    const t = await d.collection("teams").findOne({ _id: user.teamId });
    if (t) {
      const ms = await d.collection("users").find({ _id: { $in: t.members } }).project({ name: 1, username: 1 }).toArray();
      team = { name: t.name, code: t.code, members: ms.map((m) => m.name || m.username), owner: t.ownerId.toString() === uid };
    }
  }
  return Response.json({ name: user.name || user.username, email: user.username, team });
}