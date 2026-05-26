"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { revealContainer, revealItem, revealViewport } from "../home/reveal-up";

export function PortfolioFooterCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-nav)] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--color-glow-2)] blur-3xl" />
      </div>
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <motion.p variants={revealItem} className="text-lg leading-relaxed text-white/80">
          Join the growing list of clients who choose AmeriList Web Design as their
          one-stop shop for solutions that stand out and generate results. We’ve done
          wonders for our clients—we can do the same for you.
        </motion.p>
        <motion.div variants={revealItem} className="mt-8">
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
          >
            Get started
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
