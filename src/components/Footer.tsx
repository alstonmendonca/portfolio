import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/alstonmendonca", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/alstonmendonca", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:alstondmendonca@gmail.com", label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="foot wrap">
      <p className="foot__mark">ALSTON<span className="accent-mark">.</span></p>
      <p className="foot__tagline">
        Software Developer &amp; AI/ML Engineer. Dubai, UAE. <b>Open to relocation.</b>
      </p>
      <div className="foot__meta">
        <span className="foot__copy">© {new Date().getFullYear()} Alston Daniel Mendonca</span>
        <span className="foot__socials">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="icon-btn"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
