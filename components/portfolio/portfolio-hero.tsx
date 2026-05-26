"use client";

import { motion } from "framer-motion";
import { portfolioCounts } from "./portfolio-data";

export function PortfolioHero() {
  return (
    <section className="site-hero overflow-hidden bg-[#040c1c] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(56,189,248,0.3),transparent_55%),linear-gradient(180deg,#040c1c_0%,#0a1730_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-cyan-400/20 blur-[100px]" />
      </div>

      <div className="site-hero__content">
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-accent)]"
        >
          Selected work
        </motion.p>
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
        >
          Here&apos;s a quick look at work we&apos;ve shipped—websites, logos, and email
          campaigns built to captivate audiences and drive response.
        </motion.p>

        <motion.dl
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-10"
        >
          <div>
            <dt className="text-3xl font-semibold text-[var(--color-accent)]">
              {portfolioCounts.total}
            </dt>
            <dd className="mt-1 text-sm text-white/55">Projects showcased</dd>
          </div>
          <div>
            <dt className="text-3xl font-semibold text-white">{portfolioCounts.website}</dt>
            <dd className="mt-1 text-sm text-white/55">Websites</dd>
          </div>
          <div>
            <dt className="text-3xl font-semibold text-white">{portfolioCounts.logo}</dt>
            <dd className="mt-1 text-sm text-white/55">Logos</dd>
          </div>
          <div>
            <dt className="text-3xl font-semibold text-white">{portfolioCounts.email}</dt>
            <dd className="mt-1 text-sm text-white/55">Email blasts</dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
