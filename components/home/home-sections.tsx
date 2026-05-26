import Link from "next/link";

const services = [
  {
    title: "Web design & development",
    body: "Fast, accessible interfaces engineered for clarity and conversion.",
  },
  {
    title: "E-commerce",
    body: "Stores that feel premium and scale with your catalog and campaigns.",
  },
  {
    title: "SEO & performance",
    body: "Technical foundations and content structure that search engines reward.",
  },
  {
    title: "Hosting & domains",
    body: "Reliable infrastructure with the monitoring your business deserves.",
  },
  {
    title: "Social & creative",
    body: "Campaign-ready creative that stays on-brand across every touchpoint.",
  },
  {
    title: "Email marketing",
    body: "Lifecycle journeys powered by segmentation and measurable outcomes.",
  },
  {
    title: "Graphic design",
    body: "Identity systems and marketing assets with editorial polish.",
  },
  {
    title: "Data solutions",
    body: "Measurement, reporting, and optimization grounded in real behavior.",
  },
] as const;

const quotes = [
  {
    quote:
      "AmeriList knows direct marketing—how to find prospects, how to hold their attention. Mix in their expert design capabilities and you get a website that really works.",
    name: "E. Erikson",
    role: "Customer",
  },
  {
    quote:
      "AmeriList handled my website, start to finish. They’re my go-to data folks. They understand my audience and what it wants.",
    name: "R. Lanko",
    role: "Owner",
  },
  {
    quote:
      "I’ve been a client for over 10 years. They get results. Not for one second did I have second thoughts about them designing my website.",
    name: "K. McDade",
    role: "GM, Pomona Chophouse",
  },
] as const;

export function HomeSections() {
  return (
    <>
    <div className="section-light">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Professional web design with a data backbone
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--foreground-muted)]">
            We design experiences that captivate and convert—then we measure,
            learn, and refine. That is the Amerilist difference: creative that
            performs, backed by specialists who speak both design and data.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, body }) => (
            <article
              key={title}
              className="group rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]"
            >
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-muted)]">
                {body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/portfolio"
            className="inline-flex rounded-full border border-black/10 bg-[var(--background)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-strong)]"
          >
            View portfolio
          </Link>
          <Link
            href="/our-process"
            className="text-sm font-semibold text-[var(--color-accent-strong)] underline-offset-4 hover:underline"
          >
            See our process
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Growing your business is our business
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[var(--foreground-muted)]">
          A single team of designers, engineers, and data specialists—aligned
          on outcomes you can see in the numbers.
        </p>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {quotes.map(({ quote, name, role }) => (
            <blockquote
              key={name}
              className="flex flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-[0_2px_24px_rgba(15,23,42,0.06)]"
            >
              <p className="flex-1 text-base leading-relaxed text-[var(--foreground)]">
                “{quote}”
              </p>
              <footer className="mt-6 border-t border-black/5 pt-6">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {name}
                </p>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {role}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>

      <section className="relative overflow-hidden bg-[var(--color-nav)] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
        >
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--color-glow-2)] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Digital done right
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Tell us about your goals—we’ll map a path from first sketch to
              launch, with performance budgets and analytics baked in from day
              one.
            </p>
          </div>
          <div className="mt-8 flex shrink-0 lg:mt-0">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
