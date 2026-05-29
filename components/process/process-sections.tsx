"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  revealContainer,
  revealItem,
  revealViewport,
} from "../home/reveal-up";

function ProcessCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-nav)] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--color-glow-2)] blur-3xl opacity-50" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <motion.p
          variants={revealItem}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]"
        >
          Ready when you are
        </motion.p>
        <motion.h2
          variants={revealItem}
          className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Let&apos;s build a site that performs from day one
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="mt-5 text-lg leading-relaxed text-white/75"
        >
          Join the growing list of clients who choose AmeriList Web Design as their
          one-stop shop for solutions that stand out and generate results. We&apos;ve
          done wonders for our clients—we can do the same for you.
        </motion.p>
        <motion.div variants={revealItem} className="mt-10 flex flex-col items-start gap-4">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-10 py-4 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
          >
            Get started
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <p className="text-sm text-white/55">
            Or explore our{" "}
            <Link
              href="/portfolio"
              className="font-medium text-[var(--color-accent)] hover:underline"
            >
              portfolio
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function ProcessSections() {
  return <ProcessCta />;
}
