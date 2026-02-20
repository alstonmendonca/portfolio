"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

const education = [
  {
    school: "St. Joseph Engineering College",
    degree: "Bachelor of Engineering - Artificial Intelligence & Machine Learning",
    grade: "CGPA: 9.58 / 10",
    period: "2022 - 2026",
    location: "Mangaluru, India",
  },
  {
    school: "GEMS Our Own Indian School",
    degree: "Senior Secondary (Class XII) - CBSE",
    grade: "Percentage: 94.4%",
    period: "2013 - 2022",
    location: "Dubai, UAE",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".edu-header > *", {
        y: 30, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".edu-header", start: "top 85%" },
      });

      gsap.from(".edu-card", {
        y: 30, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".edu-grid", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="relative py-16 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="edu-header mb-8 sm:mb-14">
          <span className="block text-sm font-heading font-semibold tracking-widest uppercase text-muted mb-4">
            Education
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Where I <span className="gradient-text">studied.</span>
          </h2>
        </div>

        <div className="edu-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <div
              key={i}
              className="edu-card group p-5 sm:p-7 rounded-2xl bg-card border border-foreground/[0.08] hover:border-foreground/15 card-hover"
            >
              <div className="w-11 h-11 rounded-lg bg-foreground/10 flex items-center justify-center mb-5 group-hover:bg-foreground/15 transition-colors duration-300">
                <GraduationCap size={22} className="text-foreground" />
              </div>

              <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">
                {edu.school}
              </h3>
              <p className="text-muted font-sans mb-5 leading-relaxed text-[15px]">
                {edu.degree}
              </p>

              <div className="space-y-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <Award size={13} className="text-foreground/60 shrink-0" />
                  <span className="font-semibold text-foreground">{edu.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-foreground/60 shrink-0" />
                  {edu.period}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-foreground/60 shrink-0" />
                  {edu.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
