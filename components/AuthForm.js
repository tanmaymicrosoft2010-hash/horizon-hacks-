"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WebShotButton from "@/components/WebShotButton";
export default function AuthForm({ mode }) {
  const r = useRouter(), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  const reg = mode === "register";
  async function submit(e) {
    e.preventDefault(); setErr("");
    const f = Object.fromEntries(new FormData(e.target));
    if (reg && f.password !== f.confirm) return setErr("Passwords do not match");
    setBusy(true);
    const res = await fetch("/api/" + mode, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    const j = await res.json(); setBusy(false);
    if (!res.ok) return setErr(j.error);
    r.push("/dashboard"); r.refresh();
  }
  return (
    <main className="panel">
      <Link href="/" className="mk">H.</Link>
      <h1>{reg ? "Register" : "Log in"}</h1>
      <form onSubmit={submit}>
        {reg && <>
          <label>Name<input name="name" required maxLength={60} autoComplete="name" /></label>
          <label>Age<input name="age" type="number" required min={13} max={120} inputMode="numeric" /></label>
        </>}
        <label>Email<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
        <label>Password<input name="password" type="password" required minLength={8} autoComplete={reg ? "new-password" : "current-password"} /></label>
        {reg && <label>Confirm Password<input name="confirm" type="password" required minLength={8} autoComplete="new-password" /></label>}
        {err && <p className="err" role="alert">{err}</p>}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
          <WebShotButton
            type="submit"
            size="lg"
            color="#e11d2e"
            disabled={busy}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {busy ? "..." : reg ? "Create account" : "Log in"}
          </WebShotButton>
        </div>
      </form>
      <p className="sub">{reg ? <>Have an account? <Link href="/login">Log in</Link></> : <>New here? <Link href="/register">Register</Link></>}</p>
    </main>
  );
}