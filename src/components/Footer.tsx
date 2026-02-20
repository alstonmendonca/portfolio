"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-foreground/[0.08]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted font-sans">
          &copy; {new Date().getFullYear()} Alston Daniel Mendonca
        </p>
        <div className="flex items-center gap-3">
          {[
            { href: "https://github.com/alstonmendonca", label: "GitHub", Icon: Github },
            { href: "https://linkedin.com/in/alstonmendonca", label: "LinkedIn", Icon: Linkedin },
            { href: "mailto:alstondmendonca@gmail.com", label: "Email", Icon: Mail },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-foreground/10 transition-all duration-300 cursor-pointer"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
