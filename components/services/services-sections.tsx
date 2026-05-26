"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Database,
  Mail,
  PenTool,
  Search,
  Server,
  Share2,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import {
  revealContainer,
  revealItem,
  revealViewport,
} from "../home/reveal-up";

const services = [
  {
    icon: Code2,
    title: "Web development",
    body: "Our expert development team works on the cutting edge of technology and best practices. We integrate online components and build websites engineered for performance.",
    featured: true,
  },
  {
    icon: ShoppingCart,
    title: "E-commerce solutions",
    body: "Launching an online store doesn’t have to be rocket science. With the right tools and our specialists, you can sell online—and be successful at it.",
    featured: true,
  },
  {
    icon: Search,
    title: "Search engine optimization",
    body: "Our team of online and search marketing experts will optimize your website for better conversion and visibility where it matters.",
    featured: false,
  },
  {
    icon: Server,
    title: "Hosting & registration",
    body: "Comprehensive web hosting and domain registration for any size company—we can manage all of your domain and host account needs.",
    featured: false,
  },
  {
    icon: Share2,
    title: "Social media",
    body: "Over 90% of brand managers say social delivers their best customer engagement. We help you show up where your audience already lives.",
    featured: false,
  },
  {
    icon: Mail,
    title: "Email marketing",
    body: "When you need to increase traffic and conversions, nothing beats permission-based email marketing—targeted, measurable, and on-brand.",
    featured: false,
  },
  {
    icon: PenTool,
    title: "Graphic design",
    body: "First impressions matter. We craft identity and marketing assets that make your brand memorable before a word is read.",
    featured: false,
  },
  {
    icon: Database,
    title: "Data solutions",
    body: "Database marketing is our foundation. Since 2002, AmeriList has led the way for marketers who need responsive customer acquisition tools.",
    featured: false,
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
      "Do I trust AmeriList? I’ve been a client for over 10 years. They get results. Not for one second did I have second thoughts about them designing my website.",
    name: "K. McDade",
    role: "GM, Pomona Chophouse",
  },
] as const;

function ServiceCard({
  index,
  icon: Icon,
  title,
  body,
  featured,
}: {
  index: number;
  icon: typeof Code2;
  title: string;
  body: string;
  featured: boolean;
}) {
  return (
    <motion.article
      variants={revealItem}
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-[var(--color-accent)]/40 hover:bg-white/[0.07] sm:p-8 ${
        featured ? "lg:p-10" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--color-accent)]/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/8 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-3xl font-bold leading-none text-white/10 transition-colors group-hover:text-[var(--color-accent)]/30">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--color-accent)] transition group-hover:border-[var(--color-accent)]/30 group-hover:bg-[var(--color-accent)]/10">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
        </div>
        <h3
          className={`mt-6 font-semibold tracking-tight text-white ${
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65 sm:text-base">
          {body}
        </p>
        <Link
          href="/get-started"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition hover:gap-3"
        >
          View more
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export function ServicesSections() {
  return (
    <>
      {/* Intro bridge */}
      <section className="relative border-b border-white/5 bg-[#0f1b33] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-2xl">
              <motion.p
                variants={revealItem}
                className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]"
              >
                Full-stack digital
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem]"
              >
                Growing your business is our business
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mt-5 text-lg leading-relaxed text-white/70"
              >
                Questions, comments, or ready to start a project? Reach us in person,
                by phone, by email, or through our request form—a member of our team
                will map the right mix of design and digital marketing for you.
              </motion.p>
            </div>
            <motion.div variants={revealItem} className="shrink-0">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/10"
              >
                Start a project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services bento grid */}
      <section className="relative overflow-hidden bg-[#0a1220] py-20 text-white lg:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mb-14 max-w-2xl"
          >
            <motion.p
              variants={revealItem}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]"
            >
              What we deliver
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Eight disciplines. One data-driven team.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3"
          >
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`h-full ${
                  index === 0
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                    : index === 1
                      ? "lg:col-span-2"
                      : ""
                }`}
              >
                <ServiceCard index={index} {...service} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* One-stop blurb */}
      <section className="border-y border-black/5 bg-[var(--background)] py-16 lg:py-20">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.p
            variants={revealItem}
            className="text-lg leading-relaxed text-[var(--foreground-muted)]"
          >
            Join the growing list of clients who choose AmeriList Web Design as their
            one-stop shop for solutions that stand out and generate results. We’ve done
            wonders for our clients—we can do the same for you.
          </motion.p>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 lg:py-28">
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
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]"
            >
              Proof in the work
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
            >
              Clients who stayed for the results
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
                className="flex flex-col rounded-2xl border border-black/5 bg-[var(--background)] p-8 shadow-[0_2px_24px_rgba(15,23,42,0.06)]"
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
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden>
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--color-glow-2)] blur-3xl" />
          <div className="service-card-glow absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />
        </div>
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-24"
        >
          <motion.div variants={revealItem} className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to get started?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              Speak with one of our web experts now and build a digital presence
              designed to captivate, engage, and convert.
            </p>
          </motion.div>
          <motion.div variants={revealItem} className="mt-8 flex shrink-0 gap-4 lg:mt-0">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-nav)] shadow-lg shadow-sky-500/20 transition hover:brightness-110"
            >
              Get started
            </Link>
            <Link
              href="/our-process"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Our process
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
