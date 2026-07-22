import { Mail, Github, Linkedin, Phone, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const contactLinks = [
  { label: "Email", value: "alstondmendonca@gmail.com", href: "mailto:alstondmendonca@gmail.com", icon: Mail },
  { label: "Phone", value: "+91 91088 16244", href: "tel:+919108816244", icon: Phone },
  { label: "GitHub", value: "github.com/alstonmendonca", href: "https://github.com/alstonmendonca", icon: Github },
  { label: "LinkedIn", value: "linkedin.com/in/alstonmendonca", href: "https://linkedin.com/in/alstonmendonca", icon: Linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="section wrap contact">
      <div className="sec-head">
        <div className="sec-head__rule">
          <span className="sec-head__index">007 / contact</span>
          <span className="sec-head__meta">Bengaluru · open to relocation anywhere in India</span>
        </div>
        <h2 className="sec-title">Let&apos;s talk</h2>
      </div>

      <p className="contact__lede">
        Open to AI/ML and full-stack roles, collaborations, and interesting
        problems. The fastest way to reach me is email, and I reply within a day.
      </p>

      <div className="contact-grid">
        {contactLinks.map((link, i) => {
          const external = !link.href.startsWith("mailto") && !link.href.startsWith("tel");
          return (
            <Reveal
              key={link.label}
              as="a"
              className="contact-link"
              index={i}
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <span className="contact-link__l">
                <span className="icon-btn" aria-hidden>
                  <link.icon size={17} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span className="contact-link__k">{link.label}</span>
                  <span className="contact-link__v">{link.value}</span>
                </span>
              </span>
              <ArrowUpRight size={16} className="accent-mark" style={{ flexShrink: 0 }} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
