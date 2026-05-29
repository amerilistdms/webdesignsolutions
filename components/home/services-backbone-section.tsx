"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Code2,
  Globe,
  Mail,
  PenTool,
  Search,
  Server,
  Share2,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  getServiceFeatureImage,
  type ServiceImageId,
} from "../services/service-feature-images";
import {
  revealContainer,
  revealItem,
  revealViewport,
} from "./reveal-up";

const services: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: Code2,
    title: "Web design & development",
    body: "Fast, accessible interfaces engineered for clarity and conversion.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    body: "Stores that feel premium and scale with your catalog and campaigns.",
  },
  {
    icon: Search,
    title: "SEO & performance",
    body: "Technical foundations and content structure that search engines reward.",
  },
  {
    icon: Server,
    title: "Hosting & domains",
    body: "Reliable infrastructure with the monitoring your business deserves.",
  },
  {
    icon: Share2,
    title: "Social & creative",
    body: "Campaign-ready creative that stays on-brand across every touchpoint.",
  },
  {
    icon: Mail,
    title: "Email marketing",
    body: "Lifecycle journeys powered by segmentation and measurable outcomes.",
  },
  {
    icon: PenTool,
    title: "Graphic design",
    body: "Identity systems and marketing assets with editorial polish.",
  },
  {
    icon: BarChart3,
    title: "Data solutions",
    body: "Measurement, reporting, and optimization grounded in real behavior.",
  },
];

const SERVICE_IDS: ServiceImageId[] = [
  "web-development",
  "ecommerce",
  "seo",
  "hosting",
  "social-media",
  "email-marketing",
  "graphic-design",
  "data-solutions",
];

const serviceImages = services.map((service, index) =>
  getServiceFeatureImage(SERVICE_IDS[index] ?? "web-development", service.title),
);

export function ServicesBackboneSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible[0]?.target) return;

        const index = cards.indexOf(visible[0].target as HTMLElement);
        if (index >= 0) setActiveIndex(index);
      },
      {
        root: null,
        rootMargin: "-28% 0px -38% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const activeImage = serviceImages[activeIndex] ?? serviceImages[0];

  return (
    <section className="section-light relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f1f5f9_48%,#ffffff_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(56,189,248,0.2),transparent_44%),radial-gradient(circle_at_18%_72%,rgba(14,116,200,0.12),transparent_40%)]" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[var(--color-accent)]/20 blur-[100px]" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[var(--color-accent-strong)]/15 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="max-w-3xl"
        >
          <motion.p
            variants={revealItem}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent-strong)] sm:text-sm"
          >
            Full-stack digital
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            Professional web design with a data backbone
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 text-lg leading-relaxed text-[var(--foreground-muted)]"
          >
            We design experiences that captivate and convert—then we measure,
            learn, and refine. That is the Amerilist difference: creative that
            performs, backed by specialists who speak both design and data.
          </motion.p>
        </motion.div>

        <div className="mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-start lg:gap-12">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="space-y-5"
          >
            {services.map(({ icon: Icon, title, body }, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.article
                  key={title}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  variants={revealItem}
                  className={`group relative overflow-hidden rounded-2xl border bg-white/55 p-6 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 ${
                    isActive
                      ? "border-[var(--color-accent)]/40 shadow-[0_20px_48px_rgba(14,165,233,0.18)]"
                      : "border-white/60 hover:border-[var(--color-accent)]/25"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--color-accent)]/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative z-10 flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-200/60 bg-white/80 text-[var(--color-accent-strong)] shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-[var(--foreground)]">
                          {title}
                        </h3>
                        <span className="font-mono text-xs font-bold tabular-nums text-[var(--foreground)]/20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-muted)]">
                        {body}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-xl lg:hidden">
                    <Image
                      src={serviceImages[index].src}
                      alt={serviceImages[index].alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <div className="relative mt-10 hidden lg:sticky lg:top-28 lg:mt-0 lg:block">
            <div className="relative aspect-[4/5] min-h-[420px] overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
              {serviceImages.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
                    activeIndex === index
                      ? "z-10 scale-100 opacity-100"
                      : "pointer-events-none z-0 scale-[1.03] opacity-0"
                  }`}
                  sizes="(min-width: 1024px) 420px, 0px"
                  priority={index === 0}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-sm font-medium text-[var(--foreground-muted)]">
              {activeImage.alt}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm backdrop-blur transition hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-strong)]"
          >
            <Globe className="h-4 w-4" aria-hidden />
            View portfolio
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-strong)] underline-offset-4 transition hover:underline"
          >
            Explore all services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
