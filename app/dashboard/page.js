"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Dash() {
  const r = useRouter(), [me, setMe] = useState(null), [view, setView] = useState(null), [err, setErr] = useState("");
  async function load() {
    const res = await fetch("/api/me");
    if (res.status === 401) return r.push("/login");
    setMe(await res.json());
  }
  useEffect(() => { load(); }, []);
  async function act(path, body) {
    setErr("");
    const res = await fetch("/api/team/" + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await res.json();
    if (!res.ok) return setErr(j.error);
    setView(null); load();
  }
  async function out() { await fetch("/api/logout", { method: "POST" }); r.push("/"); r.refresh(); }
  if (!me) return <main className="panel"><p>Loading…</p></main>;
  return (
    <main className="panel wide">
      <div className="row"><span className="u">Dashboard</span><button className="pill" onClick={out}>Log out</button></div>
      <h1>Hi, {me.name}</h1>
      {me.team ? (
        <div className="team">
          <span className="u">Your team</span>
          <h2>{me.team.name}</h2>
          <p className="code">{me.team.code}</p>
          <p className="sub">Share this code so others can join.</p>
          <span className="u">Members ({me.team.members.length})</span>
          <ul>{me.team.members.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
      ) : (
        <>
          <div className="choice">
            <button className="big" onClick={() => { setView("create"); setErr(""); }}>Create a Team</button>
            <button className="big" onClick={() => { setView("join"); setErr(""); }}>Join a Team</button>
          </div>
          {view === "create" && (
            <form onSubmit={(e) => { e.preventDefault(); act("create", { name: new FormData(e.target).get("n") }); }}>
              <label>Team name<input name="n" required maxLength={40} /></label>
              <button className="btn">Create team</button>
            </form>
          )}
          {view === "join" && (
            <form onSubmit={(e) => { e.preventDefault(); act("join", { code: new FormData(e.target).get("c") }); }}>
              <label>Team hex code<input name="c" required maxLength={6} placeholder="A1B2C3" style={{ textTransform: "uppercase", letterSpacing: ".3em" }} /></label>
              <button className="btn">Join team</button>
            </form>
          )}
          {err && <p className="err" role="alert">{err}</p>}
        </>
      )}
    </main>
  );
}
