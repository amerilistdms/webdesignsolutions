"use client";

export function AboutHero() {
  return (
    <section className="site-hero overflow-hidden bg-[#0a1730] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(56,189,248,0.32),transparent_38%),radial-gradient(circle_at_12%_88%,rgba(14,165,233,0.18),transparent_42%),linear-gradient(118deg,#040c1c_0%,#0a1730_50%,#0f1b33_100%)]" />
        <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.2)_0%,rgba(2,6,23,0.85)_100%)]" />
      </div>

      <div className="site-hero__content">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-sm">
          About Amerilist Web Design
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          We take brands, large and small, to new heights
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
          For over fifteen years, clients have trusted Amerilist to reach the right
          people with the right message. Our web design practice brings that same
          discipline to the browser—where data, design, and measurable outcomes
          meet.
        </p>
      </div>
    </section>
  );
}
