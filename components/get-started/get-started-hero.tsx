"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { SiteHero } from "../shared/site-hero";
import { getStartedBanner } from "./get-started-data";

export function GetStartedHero() {
  return (
    <SiteHero
      className="overflow-hidden text-white"
      backdrop={
        <>
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${getStartedBanner})` }}
          />
          <div className="absolute inset-0 bg-[#040c1c]/65" />
        </>
      }
      background={
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(56,189,248,0.28),transparent_55%),linear-gradient(180deg,transparent_0%,#060d1a_92%)]" />
          <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-400/15 blur-[100px]" />
        </>
      }
      contentClassName="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
    >
      <div className="max-w-2xl text-center lg:text-left">
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-accent)]"
        >
          Get started
        </motion.p>
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Start a Creative Revolution
        </motion.h1>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-lg leading-relaxed text-white/75"
        >
          We would love to hear from you. Share your project below—or call or
          email us with your questions.
        </motion.p>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-sm flex-col gap-3 lg:w-auto lg:shrink-0"
      >
        <a
          href="tel:18004572899"
          className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium backdrop-blur-md transition hover:border-[var(--color-accent)]/50 hover:bg-white/10 lg:justify-start"
        >
          <Phone className="h-4 w-4 text-[var(--color-accent)]" />
          1.800.457.2899
        </a>
        <a
          href="mailto:sales@amerilistwebdesign.com"
          className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium backdrop-blur-md transition hover:border-[var(--color-accent)]/50 hover:bg-white/10 lg:justify-start"
        >
          <Mail className="h-4 w-4 text-[var(--color-accent)]" />
          sales@amerilistwebdesign.com
        </a>
        <p className="text-center text-xs text-white/45 lg:text-right">
          Prefer a conversation?{" "}
          <Link href="/services" className="text-[var(--color-accent)] hover:underline">
            See our services
          </Link>
        </p>
      </motion.div>
    </SiteHero>
  );
}
