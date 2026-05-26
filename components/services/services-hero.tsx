"use client";

import { motion } from "framer-motion";

export function ServicesHero() {
  return (
    <section className="site-hero overflow-hidden bg-[#040c1c] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.35),transparent_55%),radial-gradient(circle_at_90%_60%,rgba(14,165,233,0.2),transparent_45%),linear-gradient(180deg,#040c1c_0%,#0a1730_55%,#0f1b33_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_30%,black,transparent)]" />
        <div className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-400/25 blur-[100px]" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,12,28,0.95)_0%,transparent_45%)]" />
      </div>

      <div className="site-hero__content">
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-accent)] sm:text-sm"
        >
          Amerilist Web Design Solutions
        </motion.p>
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Services
        </motion.h1>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          Designed to captivate, engage, and connect you to your target audience
          online.
        </motion.p>
      </div>
    </section>
  );
}
