import Reveal from "./Reveal";

const experiences = [
  {
    role: "Junior Quantitative Developer - Indian Options & Backtesting Systems",
    company: "RPG Trading DMCC",
    location: "Dubai, UAE",
    period: "Jun 2026 → Present",
    description: [
      "Built RConnect, an event-driven options backtesting engine (QuantConnect/LEAN-style) for NSE index derivatives: ~48k LOC of Python/FastAPI with margin, Greeks, optimizer, and walk-forward, backed by 796 tests.",
      "Ran adversarial quant audits and fixed 186+ correctness defects: look-ahead bias, intrabar stops, end-of-day mark-to-market loss, and margin double-counting, each locked in with regression tests.",
      "Calibrated fill friction against 196.9M LSEG bid/ask quotes into a moneyness- and VIX-scaled per-leg model, and re-fit brokerage to the firm's real cost structure.",
      "Designed a GIFT-vs-NSE convergence arbitrage backtest on synthetic put-call-parity futures, behind a 303GB LSEG tick-to-parquet pipeline and a 94M-row DuckDB store.",
      "Shipped the terminal as an Electron app (React/TypeScript, lightweight-charts, AG Grid, Monaco) with an AI sidebar assistant on the Claude Agent SDK.",
    ],
    tags: ["Python", "FastAPI", "DuckDB", "SciPy", "React", "Electron", "Claude Agent SDK"],
  },
  {
    role: "Co-Founder & Chief Technology Officer",
    company: "ViperCore",
    location: "Mangaluru, India",
    period: "Apr 2026 → Present",
    description: [
      "Co-founded ViperCore, an offline-first Point-of-Sale platform running in production at cafes in Karnataka, covering real-time billing, inventory management, GST-compliant invoicing, and analytics dashboards.",
      "Architected and migrated the full-stack desktop app from Electron.js + HTML to Next.js with an Electron.js backend, using an offline-first architecture with AES-256 encrypted local SQLite for 100% offline reliability.",
      "Designed and deployed 9 core production modules: real-time billing, table management, KOT printing, a visual receipt editor, inventory tracking, tax reporting, employee analytics, and data export.",
      "Led the end-to-end product lifecycle from concept to production, managing on-site installations and direct support for restaurant clients.",
    ],
    tags: ["Next.js", "Electron.js", "SQLite", "AES-256", "POS"],
    link: "https://www.vipercore.in",
  },
  {
    role: "Backend Developer & Machine Learning Engineer Intern",
    company: "Aquera",
    location: "Bengaluru, India",
    period: "Nov 2025 → May 2026",
    description: [
      "Developed and fine-tuned a BERT-based transformer for automated service-account classification within Identity Access Management, reaching near-99% accuracy and deploying to production via AWS SageMaker.",
      "Optimized ML pipelines for attribute-mapping analysis, cutting end-to-end processing time by 10% and improving classification accuracy by 30% through better feature engineering and preprocessing.",
      "Built and evaluated LightGBM, CatBoost, RuleFit, and Elkan-Noto PU-Learning classifiers for identity resolution and access governance.",
      "Integrated LLM capabilities into existing data-processing workflows on AWS for intelligent document parsing and automated query resolution.",
    ],
    tags: ["Python", "BERT", "AWS SageMaker", "LightGBM", "LLM"],
  },
  {
    role: "Software Developer & AI Intern",
    company: "Heritage Safety Training Centre",
    location: "Dubai, UAE",
    period: "Oct 2024 → Oct 2025",
    description: [
      "Designed and built the company's responsive website with React.js and Vite, improving experience and accessibility for training-course participants.",
      "Deployed and integrated a Moodle-based LMS into the website, supporting 500+ registered users for course delivery, enrollment, and training-workflow automation.",
      "Built an LLM-powered conversational chatbot using ChatGPT with custom system prompts and retrieval-augmented generation for automated user support.",
    ],
    tags: ["React.js", "Vite", "LMS", "ChatGPT", "RAG"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section wrap">
      <div className="sec-head">
        <div className="sec-head__rule">
          <span className="sec-head__index">003 / experience</span>
          <span className="sec-head__meta">{experiences.length} roles</span>
        </div>
        <h2 className="sec-title">Where I&apos;ve worked</h2>
      </div>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} className="xp" index={i}>
            <div>
              <span className="xp__when">{exp.period}</span>
              <span className="xp__place">{exp.location}</span>
            </div>
            <div>
              <h3 className="xp__role">{exp.role}</h3>
              <p className="xp__company">
                {exp.link ? (
                  <a href={exp.link} target="_blank" rel="noopener noreferrer">
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </p>
              <ul className="xp__list">
                {exp.description.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
              <div className="xp__tags">
                {exp.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
