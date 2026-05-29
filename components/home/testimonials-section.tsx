"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionGlows } from "../shared/section-glows";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROTATE_MS = 5000;

const testimonials = [
  {
    quote:
      "AmeriList Web Solutions completely transformed our online presence. Within six months of launching our new site, organic traffic climbed sharply and leads followed. They're not just an agency — they're a growth partner.",
    author: "Sarah Mitchell",
    role: "CEO, Meridian Fashion",
    initials: "SM",
    color: "#38bdf8",
    rating: 5,
  },
  {
    quote:
      "The team delivered a polished platform that exceeded expectations. Their attention to detail and focus on performance is unmatched. Our conversion rate jumped in the first quarter after launch.",
    author: "James Rodriguez",
    role: "Founder, Apex Financial",
    initials: "JR",
    color: "#0ea5e9",
    rating: 5,
  },
  {
    quote:
      "From brand design to digital marketing, AmeriList handled everything with professionalism. Our brand finally looks as strong as our product — and the ROI has been clear.",
    author: "Priya Sharma",
    role: "CMO, Bloom Organics",
    initials: "PS",
    color: "#22d3ee",
    rating: 5,
  },
  {
    quote:
      "We've worked with many agencies over the years, but none match the quality and results AmeriList delivers. They think like business owners, not just designers.",
    author: "David Chen",
    role: "CTO, Horizon Tech",
    initials: "DC",
    color: "#074eb9",
    rating: 5,
  },
] as const;

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, ROTATE_MS);
  }, []);

  const goTo = useCallback((index: number) => {
    if (!contentRef.current) {
      setActive(index);
      return;
    }
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 14,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setActive(index);
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power2.out",
        });
      },
    });
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 36,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-[var(--color-nav)] px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8"
      aria-label="Client testimonials"
    >
      <SectionGlows density="rich" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div
          className="mb-5 flex justify-end gap-2.5"
          role="tablist"
          aria-label="Testimonials"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 w-2 rounded-full border transition-all ${
                i === active
                  ? "scale-125 border-[var(--color-accent)] bg-[var(--color-accent)]"
                  : "border-white/25 bg-transparent hover:border-white/50"
              }`}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                goTo(i);
                startInterval();
              }}
            />
          ))}
        </div>

        <article
          className="relative overflow-hidden rounded-2xl border bg-[#0b1220]/80 p-8 sm:p-10 md:p-11"
          style={{ borderColor: `${t.color}33` }}
        >
          <div
            className="absolute left-0 top-0 h-0.5 w-20 rounded-br-sm"
            style={{ background: t.color }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-8 top-4 select-none text-5xl leading-none sm:text-6xl"
            style={{ color: `${t.color}22` }}
            aria-hidden
          >
            &ldquo;
          </span>
          <div
            className="testimonial-progress-bar absolute bottom-0 left-0 h-0.5 rounded-tr-sm bg-[var(--color-accent)]"
            aria-hidden
          />

          <div ref={contentRef}>
            <div className="mb-4 flex gap-0.5 text-sm text-[var(--color-accent)]" aria-hidden>
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <blockquote className="relative z-[1] mb-6 max-w-3xl text-base leading-relaxed text-white/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <footer className="flex items-center gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                style={{ background: t.color }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-sm text-white/60">{t.role}</p>
              </div>
            </footer>
          </div>
        </article>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-6xl lg:mt-20 lg:flex lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Digital done right
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Tell us about your goals—we&apos;ll map a path from first sketch to
            launch, with performance budgets and analytics baked in from day one.
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
  );
}
