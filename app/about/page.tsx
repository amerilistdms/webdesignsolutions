import type { Metadata } from "next";
import { PageHeading } from "../../components/page-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the Amerilist Web Design team—designers, developers, and data specialists in one results-driven agency.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeading
        title="About Amerilist Web Design"
        description="We are the web design arm of a data-driven marketing company. That means every layout, line of code, and launch checklist is informed by how real audiences behave—not just trends."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[var(--foreground-muted)] leading-relaxed">
            For over fifteen years, clients have trusted Amerilist to reach the
            right people with the right message. Our web design practice brings
            that same discipline to the browser: clear storytelling, technical
            excellence, and measurement plans that tie creative work to
            outcomes.
          </p>
          <p className="mt-6 text-[var(--foreground-muted)] leading-relaxed">
            Whether you are refreshing a brand site, launching e-commerce, or
            scaling email and digital campaigns, you get a partner who sweats the
            details—performance, accessibility, and SEO included.
          </p>
        </div>
      </div>
    </>
  );
}
