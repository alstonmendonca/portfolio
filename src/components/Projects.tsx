import { Github, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

const projects = [
  {
    title: "RConnect",
    subtitle: "Quant options backtesting terminal · NSE derivatives",
    description:
      "A QuantConnect/LEAN-style event-driven options backtesting engine for Indian index derivatives (NIFTY, BANKNIFTY, SENSEX), wrapped in an Electron terminal with paper trading and a live data pipeline. ~48k LOC of Python/FastAPI with margin, Greeks, optimizer, and walk-forward, hardened by 186+ audited quant-correctness fixes, a 796-test suite, and fill friction calibrated against 196.9M LSEG quotes over a 94M-row DuckDB store.",
    tags: ["Python", "FastAPI", "DuckDB", "SciPy", "React", "Electron", "Claude Agent SDK"],
    github: "",
    featured: true,
  },
  {
    title: "ViperCore",
    subtitle: "Offline-first restaurant POS · in production",
    description:
      "Co-founded and built a fully-fledged offline-first Point-of-Sale platform running in production at cafes in Karnataka, India. Architected the desktop app with Next.js and Electron.js, featuring AES-256 encrypted local SQLite storage, 9 production modules (billing, KOT printing, inventory, tax reporting, employee analytics), and GST-compliant invoicing.",
    tags: ["Next.js", "Electron.js", "SQLite", "AES-256", "React", "Node.js"],
    github: "https://github.com/alstonmendonca",
    link: "https://www.vipercore.in",
    featured: true,
  },
  {
    title: "DueLLM",
    subtitle: "Self-refining LLM orchestration",
    description:
      "A self-refining generative-AI system where two LLMs iteratively critique and improve each other's outputs, with multi-model orchestration via Amazon Bedrock. Full-stack app built with Next.js and FastAPI with real-time streaming, driving automated quality improvement across reasoning, code generation, and creative writing.",
    tags: ["Next.js", "AWS Bedrock", "Boto3", "FastAPI", "Node.js"],
    github: "https://github.com/alstonmendonca",
    featured: true,
  },
  {
    title: "DressGuard AI",
    subtitle: "Real-time clothing compliance · YOLOv8",
    description:
      "Led a team of 4 to build a real-time AI-powered clothing detection and compliance system supporting webcam, video, image, and IP-camera inputs. Fine-tuned YOLOv8 on custom datasets, built a configurable rule engine with automatic model discovery and bounding-box visualization, and added facial detection and recognition via FaceNET and Redis.",
    tags: ["Python", "FastAPI", "YOLOv8", "React", "CUDA", "Redis"],
    github: "https://github.com/alstonmendonca/DressGuardAI",
    featured: true,
  },
  {
    title: "ProperLCP",
    subtitle: "Restaurant POS · in production",
    description:
      "Led a team of 2 to design, develop, and deploy a full restaurant Point-of-Sale system from scratch: 75+ core features including real-time billing, inventory tracking, and reporting dashboards comparable to PetPooja and Dineout. In production use at The Lassi Corner, SJEC, Mangaluru.",
    tags: ["Electron.js", "React", "Node.js", "SQLite", "Git"],
    github: "https://github.com/alstonmendonca/ProperLCP",
    featured: true,
  },
  {
    title: "SHANTHI",
    subtitle: "Nurse mindfulness study app",
    description:
      "A cross-platform mobile app supporting a year-long PhD study on mental wellness among nurses, with structured surveys, emotional check-ins, journaling, and guided mindfulness audio on a scalable Supabase backend.",
    tags: ["React Native", "TypeScript", "Expo", "Supabase"],
    github: "https://github.com/alstonmendonca/NurseMindfulnessStudyApp",
    featured: false,
  },
  {
    title: "RazorX",
    subtitle: "Voice-to-visualization with generative AI",
    description:
      "A voice-driven data-visualization tool that converts spoken natural-language queries into interactive charts and graphs using generative AI.",
    tags: ["Python", "JavaScript", "Generative AI"],
    github: "https://github.com/alstonmendonca/RazorX",
    featured: false,
  },
  {
    title: "Library Management System",
    subtitle: "St. Mary's Catholic Church, Dubai",
    description:
      "A customized library management system handling catalog search, member management, and lending workflows for the church community in Dubai.",
    tags: ["JavaScript", "Node.js"],
    github: "https://github.com/alstonmendonca/smcclibraryapp",
    featured: false,
  },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section wrap">
      <div className="sec-head">
        <div className="sec-head__rule">
          <span className="sec-head__index">001 / work</span>
          <span className="sec-head__meta">{featured.length} featured · {others.length} archive</span>
        </div>
        <h2 className="sec-title">Selected work</h2>
      </div>

      <div className="work-list">
        {featured.map((project, i) => (
          <Reveal key={project.title} className="work-row" index={i}>
            <span className="work-row__num">{String(i + 1).padStart(2, "0")}</span>
            <div className="work-row__body">
              <div className="work-row__top">
                <h3 className="work-row__title">{project.title}</h3>
                <span className="work-row__subtitle">{project.subtitle}</span>
              </div>
              <p className="work-row__desc">{project.description}</p>
              <div className="work-row__foot">
                <div className="work-row__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                {(project.link || project.github) && (
                  <div className="work-row__links">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-btn"
                        aria-label={`${project.title} live site`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-btn"
                        aria-label={`${project.title} GitHub`}
                      >
                        <Github size={19} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="mono-label" style={{ marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
        Archive
      </h3>
      <div className="archive-grid">
        {others.map((project, i) => (
          <Reveal key={project.title} className="archive-card lift" index={i}>
            <div className="archive-card__head">
              <span className="archive-card__title">{project.title}</span>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={`${project.title} — GitHub`}
              >
                <Github size={17} />
              </a>
            </div>
            <span className="archive-card__sub">{project.subtitle}</span>
            <p className="archive-card__desc">{project.description}</p>
            <div className="archive-card__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
