"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Mail, Github, Linkedin, Phone, ArrowUpRight } from "lucide-react";

const contactLinks = [
  { label: "Email", value: "alstondmendonca@gmail.com", href: "mailto:alstondmendonca@gmail.com", icon: Mail },
  { label: "Phone", value: "+91 9108816244", href: "tel:+919108816244", icon: Phone },
  { label: "GitHub", value: "github.com/alstonmendonca", href: "https://github.com/alstonmendonca", icon: Github },
  { label: "LinkedIn", value: "linkedin.com/in/alstonmendonca", href: "https://linkedin.com/in/alstonmendonca", icon: Linkedin },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-header > *", {
        y: 30, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-header", start: "top 85%" },
      });

      gsap.from(".contact-link", {
        y: 20, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-links", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 sm:py-28 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-foreground/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="contact-header mb-8 sm:mb-14">
          <span className="block text-sm font-heading font-semibold tracking-widest uppercase text-muted mb-4">
            Contact
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5">
            Let&apos;s <span className="gradient-text">connect.</span>
          </h2>
          <p className="text-lg text-muted font-sans max-w-xl mx-auto leading-relaxed">
            I&apos;m always open to discussing new projects, internship
            opportunities, or interesting collaborations.
          </p>
        </div>

        <div className="contact-links grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") || link.href.startsWith("tel") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") || link.href.startsWith("tel") ? undefined : "noopener noreferrer"}
              className="contact-link group flex items-center justify-between p-5 rounded-2xl bg-card border border-foreground/[0.08] hover:border-foreground/20 card-hover cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/15 transition-colors duration-300 shrink-0">
                  <link.icon size={17} className="text-foreground" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-xs text-muted uppercase tracking-wider">{link.label}</span>
                  <span className="block text-foreground font-sans text-sm truncate">{link.value}</span>
                </div>
              </div>
              <ArrowUpRight
                size={15}
                className="text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-2"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
