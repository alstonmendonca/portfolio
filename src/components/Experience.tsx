"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Co-Founder & Chief Technology Officer",
    company: "ViperCore",
    location: "Mangaluru, India",
    period: "Apr 2026 – Present",
    description: [
      "Co-founded ViperCore, an offline-first Point-of-Sale (POS) platform adopted by 50+ cafes across Karnataka, India, handling real-time billing, inventory management, GST-compliant invoicing, and analytics dashboards.",
      "Architected and migrated the full-stack desktop application from Electron.js with HTML frontend to Next.js with Electron.js backend, leveraging offline-first architecture with AES-256 encrypted local SQLite storage for 100% offline reliability.",
      "Designed and deployed 9 core production modules including real-time billing, table management, KOT printing, visual receipt editor, inventory tracking, tax reporting, employee analytics, and data export.",
      "Led end-to-end product development lifecycle from concept to production, managing on-site installations and direct customer support for 50+ restaurant clients.",
    ],
    tags: ["Next.js", "Electron.js", "SQLite", "AES-256", "POS System"],
    link: "https://www.vipercore.in",
  },
  {
    role: "Backend Developer & Machine Learning Engineer Intern",
    company: "Aquera",
    location: "Bengaluru, India",
    period: "Nov 2025 – May 2026",
    description: [
      "Developed and fine-tuned a BERT-based transformer model for automated service account classification within Identity Access Management (IAM) systems, achieving near-99% accuracy and deploying the model to production via AWS SageMaker.",
      "Optimized ML pipelines for attribute mapping analysis, reducing end-to-end processing time by 10% and improving classification accuracy by 30% through enhanced feature engineering and data preprocessing.",
      "Built and evaluated multiple ML models including LightGBM, CatBoost, RuleFit, and Elkan-Noto PU Learning Classifier for identity resolution and access governance tasks.",
      "Integrated Large Language Model (LLM) capabilities into existing data processing workflows on AWS Cloud Platform for intelligent document parsing and automated query resolution.",
    ],
    tags: ["Python", "BERT", "AWS SageMaker", "LightGBM", "LLM"],
  },
  {
    role: "Software Developer & AI Intern",
    company: "Heritage Safety Training Centre",
    location: "Dubai, UAE",
    period: "Oct 2024 – Oct 2025",
    description: [
      "Designed and developed the company's responsive website using React.js and Vite, improving user experience and accessibility for training course participants.",
      "Deployed and integrated Moodle-based Learning Management System (LMS) into the company website, supporting 500+ registered users for course delivery, enrollment management, and training workflow automation.",
      "Developed an LLM-powered conversational chatbot using ChatGPT with custom system prompts and retrieval-augmented generation (RAG) patterns for automated user support.",
    ],
    tags: ["React.js", "Vite", "LMS", "ChatGPT", "RAG"],
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
    <section ref={sectionRef} id="experience" className="relative py-16 sm:py-28 px-4 sm:px-6">
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

          <div className="space-y-6 sm:space-y-10">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-card relative pl-8 md:pl-20">
                <div className="absolute left-2 md:left-8 -translate-x-1/2 top-9 w-3 h-3 rounded-full bg-foreground border-[3px] border-background" />

                <div className="p-4 sm:p-5 md:p-7 rounded-2xl bg-card border border-foreground/[0.08] hover:border-foreground/15 card-hover overflow-hidden">
                  <h3 className="font-heading text-lg sm:text-xl font-semibold mb-3 text-foreground">
                    {exp.role}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-1.5 mb-4 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} className="text-foreground/60 shrink-0" />
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors duration-200 underline underline-offset-2"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        exp.company
                      )}
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
