"use client";

import { motion } from "framer-motion";
import { processSteps } from "./process-data";

export function ProcessHero() {
  return (
    <section className="site-hero overflow-hidden text-white">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://amerilistwebdesign.com/images/our-process-banner.jpg)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#040c1c]/75" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(56,189,248,0.35),transparent_55%),linear-gradient(180deg,transparent_0%,#040c1c_88%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-400/20 blur-[110px]" />
      </div>

      <div className="site-hero__content">
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
      </div>
    </section>
  );
}
