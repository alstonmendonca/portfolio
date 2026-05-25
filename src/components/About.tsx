"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Code2, Brain, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack",
    description:
      "From React/Next.js frontends to Node.js/FastAPI backends, I build complete production-ready applications — including a POS system serving 50+ cafes.",
  },
  {
    icon: Brain,
    title: "AI & ML",
    description:
      "Hands-on experience with BERT, YOLOv8, PyTorch, TensorFlow, AWS SageMaker, and LLM integration — deployed models achieving near-99% accuracy.",
  },
  {
    icon: Rocket,
    title: "Ship Fast",
    description:
      "From co-founding a POS startup to building AI compliance systems, I turn ideas into production software that real users depend on daily.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-header > *", {
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-header", start: "top 85%" },
      });

      gsap.from(".about-text", {
        y: 25,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 85%" },
      });

      gsap.from(".about-card", {
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-cards", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="about-header mb-12">
          <span className="block text-sm font-heading font-semibold tracking-widest uppercase text-muted mb-4">
            About Me
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            I build things that
            <br />
            <span className="gradient-text">work in the real world.</span>
          </h2>
        </div>

        <p className="about-text text-lg sm:text-xl text-muted leading-relaxed font-sans max-w-3xl mb-10 sm:mb-16">
          I&apos;m a Dubai-based AI &amp; ML engineer with over 1.5 years of
          professional experience building and deploying machine learning systems.
          I specialize in NLP, Computer Vision, and LLM integration &mdash; with
          a strong full-stack foundation. I co-founded ViperCore, a POS platform
          adopted by 50+ cafes, achieved near-99% accuracy with BERT models in
          production via AWS SageMaker, and love turning complex ideas into shipped
          products.
        </p>

        <div className="about-cards grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="about-card group p-5 sm:p-7 rounded-2xl bg-card border border-foreground/[0.08] hover:border-foreground/20 card-hover"
            >
              <div className="w-11 h-11 rounded-lg bg-foreground/10 flex items-center justify-center mb-5 group-hover:bg-foreground/15 transition-colors duration-300">
                <item.icon size={22} className="text-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted font-sans leading-relaxed text-[15px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
