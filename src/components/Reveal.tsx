"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger index — multiplied by 70ms for the transition delay. */
  index?: number;
  /** Where in the viewport the reveal should fire. */
  rootMargin?: string;
  id?: string;
  /** Any extra props (href, target, rel, …) are forwarded to the element. */
  [key: string]: unknown;
}

/**
 * One orchestrated entrance, one-shot. IntersectionObserver adds `.is-in`
 * when the element enters the viewport; it never re-fires. Reduced-motion
 * users get the content immediately (handled in CSS).
 */
export default function Reveal({
  children,
  as,
  className = "",
  index = 0,
  rootMargin = "0px 0px -12% 0px",
  id,
  ...rest
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={{ "--i": index } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
