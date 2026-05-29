"use client";

import { useRef, type ReactNode } from "react";
import { useHeroPinScroll } from "./use-hero-pin-scroll";

type SiteHeroProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Decorative layers (gradients, grid, orbs). */
  background?: ReactNode;
  /** Full-bleed photo or tint behind decorations. */
  backdrop?: ReactNode;
};

function joinClasses(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function SiteHero({
  children,
  className,
  contentClassName,
  background,
  backdrop,
}: SiteHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroPinScroll(sectionRef);

  const hasLayers = Boolean(backdrop || background);

  return (
    <section
      ref={sectionRef}
      className={joinClasses("site-hero site-hero--pin", className)}
    >
      {hasLayers ? (
        <div
          className="site-hero__bg-layer pointer-events-none absolute inset-0 overflow-hidden"
          data-hero-bg
          aria-hidden
        >
          {backdrop}
          {background}
        </div>
      ) : null}
      <div className={joinClasses("site-hero__content", contentClassName)}>
        {children}
      </div>
    </section>
  );
}
