"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll() {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;

      const instance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      lenisRef.current = instance;

      // Connect Lenis to GSAP ScrollTrigger so scroll-triggered animations fire
      instance.on("scroll", ScrollTrigger.update);

      // Use GSAP ticker to drive Lenis instead of manual rAF loop
      gsap.ticker.add((time) => {
        instance.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      cancelled = true;
      if (lenisRef.current) {
        gsap.ticker.remove(lenisRef.current.raf as Parameters<typeof gsap.ticker.remove>[0]);
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return null;
}
