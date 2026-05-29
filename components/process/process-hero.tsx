"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SiteHero } from "../shared/site-hero";
import { processIntro, processSteps } from "./process-data";

export function ProcessHero() {
  return (
    <div className="process-hero-block overflow-hidden bg-[#040c1c] text-white">
      <SiteHero
        className="text-white"
        background={
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(56,189,248,0.35),transparent_55%),linear-gradient(180deg,transparent_0%,#040c1c_88%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-400/20 blur-[110px]" />
          </>
        }
      >
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-accent)] sm:text-sm"
        >
          How we work
        </motion.p>
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Our Process
        </motion.h1>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
        >
          We take an eight-step approach to web design & development. This process
          ensures that all of your needs are met—from initial paperwork through
          ongoing support.
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap gap-2"
          aria-hidden
        >
          {processSteps.map((step) => (
            <span
              key={step.number}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tabular-nums text-white/70 backdrop-blur-sm"
            >
              {String(step.number).padStart(2, "0")}
            </span>
          ))}
        </motion.div>
      </SiteHero>

      <div className="process-hero-block__intro relative z-[1] mx-auto w-full max-w-3xl px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Eight steps. Zero guesswork.
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {processIntro.headline}
          </h2>
          <p className="mt-6 leading-relaxed text-white/72">{processIntro.body}</p>
          <div className="mt-10">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
            >
              Let&apos;s get started today
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
