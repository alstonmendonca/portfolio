"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const stats = [
  { value: 15, suffix: "+", label: "Repositories", decimals: 0 },
  { value: 5, suffix: "+", label: "Production Projects", decimals: 0 },
  { value: 9.58, suffix: "", label: "CGPA / 10", decimals: 2 },
  { value: 4, suffix: "", label: "Continents Reached", decimals: 0 },
];

function Counter({
  target,
  suffix,
  decimals,
  active,
}: {
  target: number;
  suffix: string;
  decimals: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(decimals > 0 ? "0.00" : "0");
  const obj = useRef({ val: 0 });

  useEffect(() => {
    if (!active) return;
    obj.current.val = 0;
    gsap.to(obj.current, {
      val: target,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        setDisplay(
          decimals > 0
            ? obj.current.val.toFixed(decimals)
            : String(Math.round(obj.current.val))
        );
      },
    });
  }, [active, target, decimals]);

  return (
    <span>
      {active ? display : decimals > 0 ? target.toFixed(decimals) : target}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setActive(true);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => setActive(true),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 sm:py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="stat-item text-center">
              <div className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-1.5">
                <Counter
                  target={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  active={active}
                />
              </div>
              <div className="text-sm text-muted font-sans">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
