"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Backend Developer & Machine Learning Intern",
    company: "Aquera",
    location: "Bengaluru, India",
    period: "Nov 2025 - May 2026",
    description: [
      "Implemented new features and enhanced ML pipelines for Integration Analysis within HR systems, improving data-processing reliability across modules.",
      "Supervised pipeline improvements spanning data ingestion, feature extraction, and model inference stages.",
    ],
    tags: ["Python", "ML Pipelines", "Backend", "HR Systems"],
  },
  {
    role: "Resource Person - Database Application Development",
    company: "IEEE SJEC Student Chapter",
    location: "St. Joseph Engineering College, Mangaluru",
    period: "2024",
    description: [
      "Led a 4-day technical workshop on database-driven desktop application development for second-year AIML and CSDS students.",
      "Delivered hands-on sessions demonstrating real-time database connectivity using Electron.js and SQLite, covering schema design, CRUD operations, and packaging.",
    ],
    tags: ["Electron.js", "SQLite", "Workshop", "Teaching"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".exp-header > *", {
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-header", start: "top 85%" },
      });

      gsap.from(".timeline-line", {
        scaleY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-timeline", start: "top 80%" },
      });

      gsap.from(".exp-card", {
        x: -30,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-timeline", start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative py-16 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="exp-header mb-8 sm:mb-14">
          <span className="block text-sm font-heading font-semibold tracking-widest uppercase text-muted mb-4">
            Experience
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Where I&apos;ve <span className="gradient-text">worked.</span>
          </h2>
        </div>

        <div className="exp-timeline relative">
          <div className="timeline-line absolute left-2 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-foreground/40 via-foreground/20 to-transparent origin-top" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-card relative pl-8 md:pl-20">
                <div className="absolute left-2 md:left-8 -translate-x-1/2 top-9 w-3 h-3 rounded-full bg-foreground border-[3px] border-background" />

                <div className="p-5 sm:p-7 rounded-2xl bg-card border border-foreground/[0.08] hover:border-foreground/15 card-hover">
                  <h3 className="font-heading text-lg sm:text-xl font-semibold mb-3 text-foreground">
                    {exp.role}
                  </h3>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} className="text-foreground/60 shrink-0" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-foreground/60 shrink-0" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-foreground/60 shrink-0" />
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {exp.description.map((desc, j) => (
                      <li key={j} className="text-muted font-sans leading-relaxed flex gap-3 text-[15px]">
                        <span className="text-foreground/40 mt-1.5 shrink-0 text-xs">&#9654;</span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/10 text-foreground/70 border border-foreground/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
