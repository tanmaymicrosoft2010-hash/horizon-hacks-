import { MongoClient } from "mongodb";
let p = global._mongo;
export async function db() {
  if (!p) p = global._mongo = new MongoClient(process.env.MONGODB_URI).connect();
  const c = await p;
  const d = c.db();
  if (!global._idx) {
    global._idx = true;
    await d.collection("users").createIndex({ username: 1 }, { unique: true });
    await d.collection("teams").createIndex({ code: 1 }, { unique: true });
  }
  return d;
}
