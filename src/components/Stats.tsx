"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 196.9, suffix: "M", label: "LSEG quotes analyzed", decimals: 1 },
  { value: 1.5, suffix: "+", label: "years in production", decimals: 1 },
  { value: 9.58, suffix: "", label: "CGPA / 10", decimals: 2 },
  { value: 7, suffix: "+", label: "projects shipped", decimals: 0 },
];

function Counter({
  target,
  decimals,
  active,
}: {
  target: number;
  decimals: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(target.toFixed(decimals));
  const raf = useRef(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target.toFixed(decimals));
      return;
    }
    const start = performance.now();
    const duration = 1400;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay((target * ease(t)).toFixed(decimals));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, decimals]);

  return <span>{display}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="metrics">
      {stats.map((s) => (
        <div key={s.label} className="metric">
          <div className="metric__value">
            <Counter target={s.value} decimals={s.decimals} active={active} />
            {s.suffix && <span className="suf">{s.suffix}</span>}
          </div>
          <div className="metric__label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
