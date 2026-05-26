"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  revealContainer,
  revealItem,
  revealViewport,
} from "../home/reveal-up";
import { processSteps } from "./process-data";
import { ProcessIntroParallaxSection } from "./process-intro-parallax";

function ProcessIntro() {
  return <ProcessIntroParallaxSection />;
}

function ProcessStepCard({
  step,
  isActive,
}: {
  step: (typeof processSteps)[number];
  isActive: boolean;
}) {
  const Icon = step.icon;

  return (
    <article
      id={`process-step-${step.number}`}
      className={`process-step-card scroll-mt-32 transition duration-500 ${
        isActive ? "process-step-active" : ""
      }`}
    >
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10 lg:p-12">
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${step.accent} blur-3xl transition-opacity duration-700 ${
            isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"
          }`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
          aria-hidden
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex shrink-0 items-start gap-5">
            <div className="relative">
              <span
                className={`process-step-ring absolute -inset-1 rounded-2xl bg-[var(--color-accent)]/30 blur-md transition ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-[#0f1b33]/80 text-[var(--color-accent)] shadow-lg shadow-cyan-500/10">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
            </div>
            <span className="text-5xl font-semibold tabular-nums leading-none text-white/10 sm:text-6xl">
              {String(step.number).padStart(2, "0")}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {step.title}
            </h3>
            <div className="mt-6 space-y-4">
              {step.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-white/70"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {step.subsections?.map((sub) => (
              <div
                key={sub.title}
                className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  {sub.title}
                </h4>
                <div className="mt-4 space-y-3">
                  {sub.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-sm leading-relaxed text-white/65"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {step.team?.length ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {step.team.map((role) => (
                  <li
                    key={role}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "end 0.85"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  const scrollToStep = useCallback((num: number) => {
    document
      .getElementById(`process-step-${num}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useEffect(() => {
    const elements = processSteps
      .map((s) => document.getElementById(`process-step-${s.number}`))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          const num = Number(visible[0].target.id.replace("process-step-", ""));
          if (!Number.isNaN(num)) setActiveStep(num);
        }
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#040c1c] py-20 text-white lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.07)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
            The journey
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            From first conversation to launch—and beyond
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Every phase is deliberate. You always know what happens next, who is
            involved, and why it matters for your business.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <nav
            className="mb-12 hidden lg:block"
            aria-label="Process steps"
          >
            <div className="sticky top-28">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Steps
              </p>
              <div className="relative pl-4">
                <motion.div
                  className="process-timeline-track absolute bottom-2 left-[7px] top-2 w-[2px] rounded-full"
                  style={{ scaleY: lineScale }}
                  aria-hidden
                />
                <div
                  className="absolute bottom-2 left-[7px] top-2 w-[2px] rounded-full bg-white/10"
                  aria-hidden
                />
                <ul className="relative space-y-1">
                  {processSteps.map((step) => {
                    const isActive = activeStep === step.number;
                    return (
                      <li key={step.number}>
                        <button
                          type="button"
                          onClick={() => scrollToStep(step.number)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                            isActive
                              ? "bg-[var(--color-accent)]/15 font-semibold text-[var(--color-accent)]"
                              : "text-white/50 hover:bg-white/5 hover:text-white/80"
                          }`}
                          aria-current={isActive ? "step" : undefined}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums ${
                              isActive
                                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-nav)]"
                                : "border-white/20 bg-transparent"
                            }`}
                          >
                            {String(step.number).padStart(2, "0")}
                          </span>
                          <span className="line-clamp-2 leading-snug">
                            {step.title}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>

          <div className="space-y-10 lg:space-y-14">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {processSteps.map((step) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => scrollToStep(step.number)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold tabular-nums transition ${
                    activeStep === step.number
                      ? "bg-[var(--color-accent)] text-[var(--color-nav)]"
                      : "border border-white/15 bg-white/5 text-white/70"
                  }`}
                >
                  {String(step.number).padStart(2, "0")}
                </button>
              ))}
            </div>

            {processSteps.map((step) => (
              <ProcessStepCard
                key={step.number}
                step={step}
                isActive={activeStep === step.number}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
        className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:py-28"
      >
        <div className="max-w-2xl">
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
          <motion.p variants={revealItem} className="mt-5 text-lg text-white/75 leading-relaxed">
            Join the growing list of clients who choose AmeriList Web Design as their
            one-stop shop for solutions that stand out and generate results. We&apos;ve
            done wonders for our clients—we can do the same for you.
          </motion.p>
        </div>
        <motion.div variants={revealItem} className="mt-10 shrink-0 lg:mt-0">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-10 py-4 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
          >
            Get started
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-center text-sm text-white/50 lg:text-left">
            Or explore our{" "}
            <Link href="/portfolio" className="font-medium text-[var(--color-accent)] hover:underline">
              portfolio
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function ProcessSections() {
  return (
    <>
      <ProcessIntro />
      <ProcessTimeline />
      <ProcessCta />
    </>
  );
}
