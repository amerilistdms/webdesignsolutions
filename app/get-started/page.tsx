import type { Metadata } from "next";
import { PageHeading } from "../../components/page-heading";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start a project with Amerilist Web Design—tell us about your goals and we will respond with next steps.",
};

export default function GetStartedPage() {
  return (
    <>
      <PageHeading
        title="Get started"
        description="Share a few details about your business and what you want to achieve. We will follow up to schedule a conversation—usually within one business day."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
          <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
            A contact form will live here. For now, email{" "}
            <a
              href="mailto:sales@amerilistwebdesign.com"
              className="font-semibold text-[var(--color-accent-strong)] underline-offset-2 hover:underline"
            >
              sales@amerilistwebdesign.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+18004572899"
              className="font-semibold text-[var(--color-accent-strong)] underline-offset-2 hover:underline"
            >
              1.800.457.2899
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
