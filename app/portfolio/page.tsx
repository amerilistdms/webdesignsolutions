import type { Metadata } from "next";
import { PageHeading } from "../../components/page-heading";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work and capabilities from Amerilist Web Design—sites engineered for clarity, speed, and growth.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeading
        title="Portfolio"
        description="We are updating this gallery with recent launches. In the meantime, reach out and we will share case studies that match your industry and goals."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl border border-dashed border-black/15 bg-white p-6 text-sm text-[var(--foreground-muted)] shadow-sm"
            >
              Project placeholder {i + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
