"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./Reveal";

const socials = [
  { href: "https://github.com/alstonmendonca", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/alstonmendonca", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:alstondmendonca@gmail.com", label: "Email", Icon: Mail },
];

function jump(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <header id="top" className="hero wrap">
      <Reveal className="hero__kicker" index={0} as="p">
        <span className="hero__dot" aria-hidden />
        Software Developer &amp; AI/ML Engineer
      </Reveal>

      <Reveal as="h1" className="hero__display" index={1}>
        I build software
        <br />
        that <span className="block-accent">ships</span>.
      </Reveal>

      <Reveal as="p" className="hero__lede" index={2}>
        I&apos;m Alston Mendonca. I turn machine-learning models and full-stack
        interfaces into production software real users depend on every day.
      </Reveal>

      <Reveal as="p" className="hero__meta" index={3}>
        <span>
          <b>1.5+</b> yrs shipping
        </span>
        <span>
          BERT <b>~99%</b>
        </span>
        <span>
          <b>48k</b> LOC engine
        </span>
        <span>
          CGPA <b>9.58</b>
        </span>
      </Reveal>

      <Reveal className="hero__actions" index={4}>
        <button type="button" className="btn btn--primary" onClick={() => jump("#work")}>
          View selected work
          <span aria-hidden>→</span>
        </button>
        <a className="btn btn--ghost" href="/Alston_Mendonca_Resume.pdf" download>
          Résumé <span aria-hidden>↓</span>
        </a>
        <span className="hero__socials">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="icon-btn"
              aria-label={label}
            >
              <Icon size={19} />
            </a>
          ))}
        </span>
      </Reveal>

      <Reveal className="hero__scroll" index={5}>
        <ArrowDown size={14} /> Scroll to work
      </Reveal>
    </header>
  );
}
