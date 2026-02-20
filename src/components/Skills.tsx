"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Code2, Layout, Server, Database, Brain, Container } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillCategory {
  category: string;
  icon: LucideIcon;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  { category: "Languages", icon: Code2, skills: ["Python", "JavaScript", "TypeScript", "SQL", "C", "C#", "Java"] },
  { category: "Frontend", icon: Layout, skills: ["React.js", "Next.js", "React Native", "HTML/CSS", "Tailwind CSS"] },
  { category: "Backend", icon: Server, skills: ["Node.js", "Express.js", "FastAPI", "Electron.js"] },
  { category: "Databases", icon: Database, skills: ["PostgreSQL", "MySQL", "SQLite", "Supabase", "Redis"] },
  { category: "AI / ML", icon: Brain, skills: ["YOLOv8", "PyTorch", "TensorFlow", "OpenCV", "Scikit-learn", "Pandas", "Keras"] },
  { category: "DevOps & Tools", icon: Container, skills: ["Docker", "Git", "Expo", "CUDA", "Linux"] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".skills-header > *", {
        y: 30, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-header", start: "top 85%" },
      });

      gsap.from(".skill-group", {
        y: 30, duration: 0.6, stagger: 0.07, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-grid", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-16 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="skills-header mb-8 sm:mb-14">
          <span className="block text-sm font-heading font-semibold tracking-widest uppercase text-muted mb-4">
            Skills
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            My <span className="gradient-text">toolkit.</span>
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((group) => (
            <div
              key={group.category}
              className="skill-group p-6 rounded-2xl bg-card border border-foreground/[0.08] hover:border-foreground/15 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
                  <group.icon size={17} className="text-foreground/70" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-foreground tracking-wide">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-sans rounded-lg bg-background/60 border border-foreground/[0.06] text-muted hover:text-foreground hover:border-foreground/25 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
