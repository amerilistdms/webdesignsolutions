import Link from "next/link";
import { HeroTaglines } from "./hero-taglines";

export function Hero() {
  return (
    <section className="relative -mt-[var(--site-header-offset)] flex min-h-dvh w-full items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(56,189,248,0.28),transparent_34%),radial-gradient(circle_at_70%_58%,rgba(59,130,246,0.2),transparent_42%),linear-gradient(118deg,#040c1c_0%,#0a1730_45%,#0f1b33_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 top-1/4 h-[24rem] w-[24rem] rounded-full bg-cyan-400/18 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-[-6rem] h-[20rem] w-[20rem] rounded-full bg-blue-500/18 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.24)_0%,rgba(2,6,23,0.72)_100%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-sm">
          Amerilist Web Design Solutions
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Data-driven digital solutions
        </h1>
        <HeroTaglines />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--color-nav)] shadow-lg shadow-sky-500/25 transition hover:brightness-110"
          >
            Get started
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
          >
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
