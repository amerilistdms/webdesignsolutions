import type { Metadata } from "next";
import { PageHeading } from "../../components/page-heading";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How Amerilist Web Design takes you from discovery to launch—with data checkpoints along the way.",
};

const steps = [
  {
    title: "Discover",
    body: "We align on audiences, offers, and success metrics. No vanity work—just clarity on what “winning” looks like.",
  },
  {
    title: "Design",
    body: "Wireframes and visual design that respect your brand and prioritize conversion paths on every screen size.",
  },
  {
    title: "Build",
    body: "Fast, accessible front ends and solid CMS or e-commerce foundations you can grow with.",
  },
  {
    title: "Launch & learn",
    body: "QA, analytics, and tagging so you can read the story your visitors are telling you from day one.",
  },
] as const;

export default function OurProcessPage() {
  return (
    <>
      <PageHeading
        title="Our process"
        description="A straightforward rhythm that keeps stakeholders informed and reduces surprises. You always know what is happening next."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <ol className="grid gap-6 md:grid-cols-2">
          {steps.map(({ title, body }, index) => (
            <li
              key={title}
              className="relative rounded-2xl border border-black/5 bg-white p-8 shadow-sm"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent-strong)]">
                Step {index + 1}
              </span>
              <h2 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                {title}
              </h2>
              <p className="mt-3 text-[var(--foreground-muted)] leading-relaxed">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
