"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Download } from "lucide-react";
import Image from "next/image";

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".resume-header > *", {
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".resume-header", start: "top 85%" },
      });

      gsap.from(".resume-card", {
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".resume-card", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="resume" className="relative py-16 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="resume-header mb-8 sm:mb-14">
          <span className="block text-sm font-heading font-semibold tracking-widest uppercase text-muted mb-4">
            Resume
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            My <span className="gradient-text">resume.</span>
          </h2>
        </div>

        <div className="resume-card rounded-2xl bg-card border border-foreground/[0.08] overflow-hidden">
          <div className="flex items-center justify-end px-7 py-5 border-b border-foreground/[0.08]">
            <a
              href="/Alston_Mendonca_Resume.pdf"
              download
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-heading font-semibold text-sm hover:bg-accent-hover transition-all duration-300 cursor-pointer"
            >
              <Download size={15} />
              Download
            </a>
          </div>

          <div className="p-4 sm:p-6 md:p-8 flex justify-center bg-background/40">
            <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl shadow-black/40 border border-foreground/[0.06] bg-white">
              <Image
                src="/resume.png"
                alt="Alston Mendonca's Resume"
                width={2125}
                height={2750}
                className="w-full h-auto bg-white"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
