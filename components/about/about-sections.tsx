"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Handshake,
  Palette,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  revealContainer,
  revealItem,
  revealViewport,
} from "../home/reveal-up";

const pillars = [
  {
    icon: Palette,
    title: "Design chops",
    body: "We’re not new to the digital rodeo. We’ve been crafting and pioneering successful web solutions for over 15 years. Our designers and developers know what works—and they research what works for your customers.",
  },
  {
    icon: BarChart3,
    title: "Data savvy",
    body: "We don’t believe in smoke and mirrors. We take the time to know your business, build custom data for your needs, and apply it to digital creations that engineer marketing solutions and stand-out web design.",
  },
] as const;

const processSteps = [
  "We appraise your needs.",
  "We learn and research your business and industry landscape.",
  "We compile and apply our data and learning to create web solutions that grow your business.",
  "We follow up with brand-building services like direct mail and social media.",
  "We stand behind the quality of our work and the effectiveness of our services.",
] as const;

const whyChoose = [
  {
    icon: Handshake,
    title: "We believe in you",
    body: "We consider you a partner. That means we’re committed to serving you.",
  },
  {
    icon: Target,
    title: "We’re results driven",
    body: "We take pride in helping clients—it’s what makes us jump out of bed in the morning.",
  },
  {
    icon: Users,
    title: "We build lasting relationships",
    body: "We want to keep you as our client and create a long-term relationship that works for your business.",
  },
] as const;

const testimonials = [
  {
    quote:
      "AmeriList handled my website, start to finish. They’re my go-to data folks. They understand my audience and what it wants. They designed a kick-ass website for us.",
    name: "R. Lanko",
    role: "Owner",
  },
  {
    quote:
      "AmeriList knows direct marketing…how to find prospects, how to hold their attention. Mix in their expert design capabilities and you get a website that really works.",
    name: "E. Erikson",
    role: "Customer",
  },
  {
    quote:
      "Do I trust AmeriList? Let me put it this way, I’ve been a client for over 10 years. They get results. So did I have any second thoughts about them designing my website? Not for one second.",
    name: "K. McDade",
    role: "GM, Pomona Chophouse",
  },
] as const;

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/50 bg-white/40 p-8 shadow-[0_8px_40px_rgba(14,116,200,0.08),inset_0_1px_1px_rgba(255,255,255,0.75)] backdrop-blur-2xl ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 via-transparent to-sky-100/30"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function AboutSections() {
  return (
    <>
      {/* Two pillars */}
      <section className="section-light relative overflow-hidden bg-[#f8fafc] py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] [background-size:64px_64px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="max-w-3xl"
          >
            <motion.p
              variants={revealItem}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-sm"
            >
              How we capture attention
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
            >
              Our web design triggers response in{" "}
              <span className="text-[var(--color-accent-strong)]">two ways</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mt-14 grid gap-6 lg:grid-cols-2"
          >
            {pillars.map(({ icon: Icon, title, body }) => (
              <motion.div key={title} variants={revealItem}>
                <GlassCard>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-sky-200/60 bg-sky-50/80 text-[var(--color-accent-strong)]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--foreground-muted)]">
                    {body}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission quote */}
      <section className="relative overflow-hidden bg-[var(--color-nav)] py-20 text-white lg:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--color-glow-2)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={revealItem} className="flex items-start gap-3">
            <Sparkles className="mt-1 h-6 w-6 shrink-0 text-[var(--color-accent)]" />
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              What gets us jazzed
            </p>
          </motion.div>
          <motion.h2
            variants={revealItem}
            className="mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            Data-driven design with backbone—not smoke and mirrors
          </motion.h2>
          <motion.div
            variants={revealItem}
            className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-white/80"
          >
            <p>
              The world is awash in web designs: pretty pictures, pretty words, little
              substance. AmeriList comes at web design from a smarter point of view—
              data-driven design that puts tangible results behind smart words and
              brilliant creative.
            </p>
            <p>
              Clients expect us to do what they cannot: create digital messaging that
              says who they are, what they do, and how they benefit their customers.
              We develop dynamic messaging that stimulates customers to learn more and
              buy more—while preserving the authentic nature of every brand.
            </p>
          </motion.div>
          <motion.footer
            variants={revealItem}
            className="mt-10 border-t border-white/10 pt-8"
          >
            <p className="text-sm font-semibold text-white">Ravi Backerdan</p>
            <p className="mt-1 text-sm text-white/60">
              Dir. Business Development, AmeriList Web Design
            </p>
          </motion.footer>
        </motion.div>
      </section>

      {/* Process + Why choose */}
      <section className="section-light mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <motion.p
              variants={revealItem}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-sm"
            >
              How we do business
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)]"
            >
              A clear path from discovery to results
            </motion.h2>
            <motion.ol
              variants={revealContainer}
              className="mt-8 space-y-4"
            >
              {processSteps.map((step, i) => (
                <motion.li
                  key={step}
                  variants={revealItem}
                  className="flex gap-4 rounded-xl border border-black/5 bg-white px-5 py-4 shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-sm font-bold text-[var(--color-accent-strong)]">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[var(--foreground-muted)] leading-relaxed">
                    {step}
                  </span>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <motion.p
              variants={revealItem}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-sm"
            >
              Why choose us
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)]"
            >
              A partner invested in your growth
            </motion.h2>
            <div className="mt-8 space-y-5">
              {whyChoose.map(({ icon: Icon, title, body }) => (
                <motion.article
                  key={title}
                  variants={revealItem}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_24px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[var(--color-accent-strong)]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
                        {body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-light border-t border-black/5 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="text-center"
          >
            <motion.p
              variants={revealItem}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-sm"
            >
              Client voices
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
            >
              Trusted for over a decade
            </motion.h2>
          </motion.div>
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mt-14 grid gap-6 lg:grid-cols-3"
          >
            {testimonials.map(({ quote, name, role }) => (
              <motion.blockquote
                key={name}
                variants={revealItem}
                className="flex flex-col rounded-2xl border border-black/5 bg-[var(--background)] p-8"
              >
                <p className="flex-1 text-base leading-relaxed text-[var(--foreground)]">
                  “{quote}”
                </p>
                <footer className="mt-6 border-t border-black/5 pt-6">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {name}
                  </p>
                  <p className="text-sm text-[var(--foreground-muted)]">{role}</p>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[var(--color-nav)] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
        >
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--color-glow-2)] blur-3xl" />
        </div>
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-20"
        >
          <motion.div variants={revealItem} className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Speak with one of our web experts and see how data-driven design can
              move your brand forward.
            </p>
          </motion.div>
          <motion.div variants={revealItem} className="mt-8 shrink-0 lg:mt-0">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
            >
              Get started
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
