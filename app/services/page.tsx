import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "../../components/page-heading";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design and development, e-commerce, SEO, hosting, email marketing, creative, and data solutions from Amerilist Web Design.",
};

const items = [
  "Responsive web design and development",
  "E-commerce experiences",
  "Search engine optimization",
  "Hosting and domain setup",
  "Social and digital creative",
  "Email marketing and automation",
  "Graphic design and brand support",
  "Analytics, reporting, and optimization",
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeading
        title="Services"
        description="Everything you need to show up beautifully online—and prove what is working. Pick one engagement or bundle services; we assemble the right team for your goals."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-black/5 bg-white px-6 py-5 text-[var(--foreground)] shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-[var(--foreground-muted)]">
          Ready to scope a project?{" "}
          <Link
            href="/get-started"
            className="font-semibold text-[var(--color-accent-strong)] underline-offset-2 hover:underline"
          >
            Get started
          </Link>{" "}
          and we will follow up with next steps.
        </p>
      </div>
    </>
  );
}
