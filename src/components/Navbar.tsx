"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Toolkit", href: "#skills" },
  { label: "Résumé", href: "#resume" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const sections = navLinks.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = `#${id}`;
      }
      setActiveSection(current);
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [mobileOpen]);

  const go = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header ref={navRef} className="nav-slab-wrap">
      <div className="nav-slab">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="slab-mark"
        >
          ALSTON<span className="accent-mark">/</span>
        </a>

        <nav className="slab-nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={activeSection === link.href ? "is-active" : ""}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            go("#contact");
          }}
          className="slab-cta"
        >
          Get in touch
        </a>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="slab-burger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="slab-sheet">
          {[...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              className="slab-sheet__link"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .nav-slab-wrap {
          position: sticky;
          top: 0;
          z-index: 200;
        }
        .nav-slab {
          display: flex;
          align-items: stretch;
          background: var(--color-paper);
          border-bottom: 3px solid var(--color-ink);
        }
        .slab-mark {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: var(--text-md);
          letter-spacing: 0.02em;
          color: var(--color-ink);
          padding: 0.9rem var(--page-gutter);
          border-right: 3px solid var(--color-ink);
          white-space: nowrap;
        }
        .slab-nav { display: none; margin-left: auto; }
        .slab-nav ul {
          display: flex;
          align-items: stretch;
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
          height: 100%;
        }
        .slab-nav li { display: flex; border-left: 2px solid var(--color-ink); }
        .slab-nav a {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
          font-weight: 600;
          font-size: var(--text-sm);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-ink);
          padding: 0 1.1rem;
          transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out);
        }
        .slab-nav a:hover { background: var(--color-ink); color: var(--color-paper); }
        .slab-nav a.is-active { background: var(--color-accent); color: var(--color-on-accent); }
        .slab-cta {
          display: none;
          align-items: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: var(--text-sm);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          white-space: nowrap;
          color: var(--color-on-accent);
          background: var(--color-accent);
          padding: 0 1.3rem;
          border-left: 3px solid var(--color-ink);
          transition: background-color var(--dur-short) var(--ease-out);
        }
        .slab-cta:hover { background: var(--color-accent-deep); }
        .slab-burger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          margin-left: auto;
          color: var(--color-ink);
          border-left: 3px solid var(--color-ink);
          cursor: pointer;
        }
        .slab-sheet {
          display: flex;
          flex-direction: column;
          background: var(--color-paper);
          border-bottom: 3px solid var(--color-ink);
        }
        .slab-sheet__link {
          padding: 1rem var(--page-gutter);
          font-family: var(--font-mono);
          font-weight: 600;
          font-size: var(--text-base);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-ink);
          border-top: 2px solid var(--color-ink);
        }
        .slab-sheet__link:first-child { border-top: 0; }
        .slab-sheet__link:hover { background: var(--color-ink); color: var(--color-paper); }

        @media (min-width: 52rem) {
          .slab-nav { display: flex; }
          .slab-cta { display: inline-flex; }
          .slab-burger { display: none; }
        }
      `}</style>
    </header>
  );
}
