"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(
    null
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let rafId = 0;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;

      const isMobile = window.innerWidth < 640;
      const instance = new Lenis({
        duration: isMobile ? 0.8 : 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: isMobile ? 1.5 : 2,
      });
      lenisRef.current = instance;

      const raf = (time: number) => {
        instance.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
