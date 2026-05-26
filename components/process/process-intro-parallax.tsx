"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  revealContainer,
  revealItem,
  revealViewport,
} from "../home/reveal-up";
import { processIntro } from "./process-data";

/** Mismo factor que Plan B CTAFinalBanner / banner con imagen */
const BG_DRIFT = 0.3;
const CONTENT_DRIFT = 0.1;

export function ProcessIntroParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [bgOffset, setBgOffset] = useState(0);
  const [contentOffset, setContentOffset] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom > 0 && rect.top < vh) {
        setBgOffset(rect.top * BG_DRIFT);
        setContentOffset(rect.top * CONTENT_DRIFT);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[65vh] items-center overflow-hidden border-b border-black/5 bg-[var(--background)]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-0 right-0 -top-[10%] h-[120%] w-full will-change-transform"
          style={{ transform: `translate3d(0, ${bgOffset}px, 0)` }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(15,23,42,0.05),transparent_44%),radial-gradient(circle_at_18%_72%,rgba(71,85,105,0.06),transparent_40%),linear-gradient(180deg,var(--background)_0%,#e8ebf1_50%,var(--background)_100%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>
      </div>

      <div
        className="relative z-10 mx-auto w-full max-w-3xl px-4 py-20 will-change-transform sm:px-6 lg:px-8 lg:py-28"
        style={{ transform: `translate3d(0, ${contentOffset}px, 0)` }}
      >
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="text-center"
        >
          <motion.p
            variants={revealItem}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]"
          >
            Eight steps. Zero guesswork.
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            {processIntro.headline}
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-6 text-[var(--foreground-muted)] leading-relaxed"
          >
            {processIntro.body}
          </motion.p>
          <motion.div variants={revealItem} className="mt-10">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
            >
              Let&apos;s get started today
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
