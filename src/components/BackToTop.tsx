"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      setVisible(window.scrollY > 700);
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="back-to-top mobile-safe-bottom"
      data-visible={visible}
    >
      <ArrowUp size={20} />
      <style jsx>{`
        .back-to-top {
          position: fixed;
          right: clamp(1rem, 4vw, 1.5rem);
          z-index: 200;
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--color-on-accent);
          background: var(--color-accent);
          border: 3px solid var(--color-ink);
          box-shadow: var(--shadow-hard-sm);
          cursor: pointer;
          opacity: 0;
          transform: translateY(12px);
          pointer-events: none;
          transition: opacity var(--dur-short) var(--ease-out),
                      transform var(--dur-micro) var(--ease-out),
                      box-shadow var(--dur-micro) var(--ease-out),
                      background-color var(--dur-short) var(--ease-out);
        }
        .back-to-top[data-visible="true"] {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }
        .back-to-top[data-visible="true"]:hover {
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hard);
          background: var(--color-accent-deep);
        }
        .back-to-top[data-visible="true"]:active {
          transform: translate(0, 0);
          box-shadow: 2px 2px 0 var(--color-ink);
        }
      `}</style>
    </button>
  );
}
