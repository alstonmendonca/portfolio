"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Github, Folder } from "lucide-react";

const projects = [
  {
    title: "DressGuard AI",
    subtitle: "AI-Powered Clothing Compliance System",
    description:
      "Built a real-time clothing compliance detection system supporting webcam, video file, image upload, and IP camera inputs. Engineered a dual-mode webcam pipeline with lightweight positioning guidance followed by frame-skipped YOLOv8 inference, reducing idle GPU usage.",
    tags: ["Python", "FastAPI", "YOLOv8", "React", "Vite", "CUDA", "Redis"],
    github: "https://github.com/alstonmendonca/DressGuardAI",
    featured: true,
  },
  {
    title: "ProperLCP",
    subtitle: "Restaurant POS System — In Production",
    description:
      "Led a 2-person team to design, develop, and deploy a full-featured Point-of-Sale system from scratch. Currently in production use at Lassi Corner, SJEC, Mangalore — handling daily order management, billing, and inventory tracking.",
    tags: ["Electron.js", "React", "Node.js", "SQLite"],
    github: "https://github.com/alstonmendonca/ProperLCP",
    featured: true,
  },
  {
    title: "SHANTHI",
    subtitle: "Nurse Mindfulness Study App",
    description:
      "Developed a cross-platform mobile application for PhD research on nurse mental wellness, enabling survey questionnaires, emotional check-ins, and journaling. Integrated Supabase for authentication and real-time data sync.",
    tags: ["React Native", "TypeScript", "Expo", "Supabase"],
    github: "https://github.com/alstonmendonca/NurseMindfulnessStudyApp",
    featured: true,
  },
  {
    title: "RazorX",
    subtitle: "Voice-to-Visualization with Generative AI",
    description:
      "Developed a voice-driven data visualization tool that converts spoken natural-language queries into interactive charts and graphs using generative AI.",
    tags: ["Python", "JavaScript", "Generative AI"],
    github: "https://github.com/alstonmendonca/RazorX",
    featured: false,
  },
  {
    title: "Library Management System",
    subtitle: "St. Mary's Catholic Church, Dubai",
    description:
      "Built a customized library management system handling catalog search, member management, and lending workflows for the church community in Dubai.",
    tags: ["JavaScript", "Node.js"],
    github: "https://github.com/alstonmendonca/smcclibraryapp",
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".proj-header > *", {
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-header", start: "top 85%" },
      });

      gsap.from(".proj-featured", {
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-grid", start: "top 82%" },
      });

      gsap.from(".proj-other", {
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-others-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="relative py-16 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-foreground/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="proj-header mb-8 sm:mb-14">
          <span className="block text-sm font-heading font-semibold tracking-widest uppercase text-muted mb-4">
            Projects
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Things I&apos;ve <span className="gradient-text">built.</span>
          </h2>
        </div>

        {/* Featured */}
        <div className="proj-grid space-y-6 mb-8 sm:mb-14">
          {featured.map((project) => (
            <a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-featured group block p-5 sm:p-7 md:p-9 rounded-2xl bg-card border border-foreground/[0.08] hover:border-foreground/20 card-hover cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-heading font-semibold tracking-widest uppercase text-muted">
                    Featured Project
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold mt-1 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm mt-1 font-sans">
                    {project.subtitle}
                  </p>
                </div>
                <Github
                  size={20}
                  className="text-muted group-hover:text-foreground transition-colors duration-300 shrink-0 mt-2"
                />
              </div>

              <p className="text-muted font-sans leading-relaxed mb-5 max-w-3xl text-[15px]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/8 text-muted border border-foreground/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Other */}
        <h3 className="font-heading text-xl font-semibold mb-6 text-muted">
          Other Projects
        </h3>
        <div className="proj-others-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {others.map((project) => (
            <a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-other group block p-6 rounded-2xl bg-card border border-foreground/[0.08] hover:border-foreground/20 card-hover cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <Folder size={18} className="text-foreground/60 shrink-0" />
                  <h4 className="font-heading text-base font-semibold group-hover:text-foreground transition-colors duration-300">
                    {project.title}
                  </h4>
                </div>
                <Github
                  size={16}
                  className="text-muted group-hover:text-foreground transition-colors duration-300 shrink-0 mt-0.5"
                />
              </div>
              <p className="text-sm text-muted/70 mb-1.5 font-sans">
                {project.subtitle}
              </p>
              <p className="text-muted text-sm font-sans leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs rounded-full bg-foreground/8 text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
