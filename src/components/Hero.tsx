"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Badge
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
      });

      // Char-split the name
      if (nameRef.current) {
        const text = nameRef.current.textContent || "";
        nameRef.current.innerHTML = text
          .split("")
          .map(
            (char) =>
              `<span style="display:inline-block;opacity:0;transform:translateY(50px)">${char === " " ? "&nbsp;" : char}</span>`
          )
          .join("");

        tl.to(
          nameRef.current.querySelectorAll("span"),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.02, ease: "power3.out" },
          "-=0.2"
        );
      }

      tl.from(taglineRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.15");
      tl.from(ctaRef.current, { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.2");
      tl.from(socialsRef.current, { opacity: 0, y: 16, duration: 0.4, ease: "power3.out" }, "-=0.15");
      tl.from(scrollRef.current, { opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.1");

      // Floating arrow
      gsap.to(scrollRef.current, { y: 8, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" });

      // Parallax fade on scroll
      gsap.to(contentRef.current, {
        y: 80,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-foreground/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-foreground/[0.02] rounded-full blur-[120px]" />

      <div ref={contentRef} className="relative z-10 text-center max-w-5xl mx-auto">
        <div ref={badgeRef} className="mb-4 sm:mb-8">
          <span className="inline-block px-5 py-2.5 rounded-full border border-border text-sm text-muted font-sans tracking-wide">
            Full-Stack Developer &amp; ML Engineer
          </span>
        </div>

        <h1
          ref={nameRef}
          className="font-heading text-[2rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold tracking-tight leading-[1.05] mb-4 sm:mb-8"
          aria-label="Alston Mendonca"
        >
          Alston Mendonca
        </h1>

        <p
          ref={taglineRef}
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-12 font-sans leading-relaxed"
        >
          Building production-ready applications with AI, full-stack
          engineering, and a passion for solving real-world problems.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-14">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group px-8 py-4 bg-foreground text-background font-heading font-semibold rounded-xl hover:bg-accent-hover transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            View My Work
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 border border-border text-foreground font-heading font-semibold rounded-xl hover:border-foreground/50 transition-all duration-300 cursor-pointer text-center"
          >
            Get In Touch
          </a>
        </div>

        <div ref={socialsRef} className="flex gap-3 justify-center">
          {[
            { href: "https://github.com/alstonmendonca", label: "GitHub", Icon: Github },
            { href: "https://linkedin.com/in/alstonmendonca", label: "LinkedIn", Icon: Linkedin },
            { href: "mailto:alstondmendonca@gmail.com", label: "Email", Icon: Mail },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-muted hover:text-foreground hover:bg-foreground/10 transition-all duration-300 cursor-pointer"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/60"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}
