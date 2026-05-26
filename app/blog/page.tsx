import type { Metadata } from "next";
import { PageHeading } from "../../components/page-heading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on web design, digital marketing, and data from Amerilist Web Design.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeading
        title="Blog"
        description="Articles and updates are on the way. Check back soon—or get in touch if there is a topic you would like us to cover."
      />
      <div className="section-light mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-[var(--foreground-muted)]">
          No posts published yet on this new site build.
        </p>
      </div>
    </>
  );
}
