import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Amerilist Web Design by email or phone. We respond to project questions and new business inquiries.",
};

const SALES_EMAIL = "sales@amerilistwebdesign.com";

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-nav)] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-[var(--color-glow-2)] blur-3xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
          Get in touch
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Email us directly
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/75">
          Have a question that isn&apos;t in our FAQ? Send us a note and we&apos;ll
          get back to you with clear next steps.
        </p>

        <a
          href={`mailto:${SALES_EMAIL}`}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-base font-semibold text-[var(--color-nav)] transition hover:brightness-110"
        >
          {SALES_EMAIL}
        </a>

        <p className="mt-8 text-sm text-white/55">
          Prefer a guided brief?{" "}
          <Link href="/get-started" className="font-semibold text-[var(--color-accent)] hover:underline">
            Start a project instead →
          </Link>
        </p>

        <p className="mt-6 text-sm text-white/55">
          Or call{" "}
          <a href="tel:18004572899" className="font-semibold text-white hover:text-[var(--color-accent)]">
            1.800.457.2899
          </a>
        </p>
      </div>
    </section>
  );
}
