"use client";
import { useEffect, useState } from "react";

export default function Motion() {
  const [progress, setProgress] = useState(0);
  const [out, setOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t0 = performance.now();
    let raf;
    let timeout;
    (function tk(now) {
      const p = Math.min(1, (now - t0) / 1600);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tk);
      else {
        setOut(true);
        timeout = setTimeout(() => setVisible(false), 900);
      }
    })(t0);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`ld${out ? " out" : ""}`} aria-hidden="true">
      <div className="lt"><span>Horizon.Hacks</span><span>Loading · May 2027</span></div>
      <b style={{ fontWeight: 200 + progress * 6.5 }}>{progress}</b>
      <i className="lb" />
    </div>
  );
}
