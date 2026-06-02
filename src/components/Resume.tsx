"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";
import resumeManifest from "@/generated/resumeManifest.json";

interface ResumePage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const pages = useMemo(() => resumeManifest.pages as ResumePage[], []);
  const [currentPage, setCurrentPage] = useState(0);
  const activePage = pages[currentPage] ?? pages[0];

  useEffect(() => {
    setCurrentPage((pageIndex) => Math.min(pageIndex, Math.max(pages.length - 1, 0)));
  }, [pages.length]);

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
    <section ref={sectionRef} id="resume" className="relative py-16 sm:py-28 px-4 sm:px-6">
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-7 py-4 sm:py-5 border-b border-foreground/[0.08]">
            {pages.length > 1 ? (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((pageIndex) => Math.max(pageIndex - 1, 0))}
                  disabled={currentPage === 0}
                  aria-label="Previous resume page"
                  className="flex items-center justify-center w-11 h-11 rounded-xl border border-foreground/[0.1] text-foreground disabled:text-muted/40 disabled:border-foreground/[0.06] disabled:cursor-not-allowed hover:border-foreground/30 transition-colors duration-300"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="min-w-24 text-center text-sm font-heading font-medium text-muted">
                  Page {currentPage + 1} of {pages.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((pageIndex) => Math.min(pageIndex + 1, pages.length - 1))
                  }
                  disabled={currentPage === pages.length - 1}
                  aria-label="Next resume page"
                  className="flex items-center justify-center w-11 h-11 rounded-xl border border-foreground/[0.1] text-foreground disabled:text-muted/40 disabled:border-foreground/[0.06] disabled:cursor-not-allowed hover:border-foreground/30 transition-colors duration-300"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            ) : (
              <div />
            )}

            <a
              href={resumeManifest.pdf}
              download
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-heading font-semibold text-sm hover:bg-accent-hover transition-all duration-300 cursor-pointer"
            >
              <Download size={15} />
              Download PDF
            </a>
          </div>

          <div className="p-4 sm:p-6 md:p-8 flex justify-center bg-background/40">
            {activePage ? (
              <div className="w-full max-w-[22rem] sm:max-w-2xl rounded-lg overflow-hidden shadow-2xl shadow-black/40 border border-foreground/[0.06] bg-white">
                <Image
                  key={activePage.src}
                  src={activePage.src}
                  alt={activePage.alt}
                  width={activePage.width}
                  height={activePage.height}
                  sizes="(max-width: 640px) 92vw, 42rem"
                  className="w-full h-auto bg-white"
                  priority={false}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
