import type { Metadata } from "next";
import { PageHeading } from "../../components/page-heading";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Amerilist Web Design.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeading
        title="Terms of use"
        description="This page will host the terms of use for Amerilist Web Design. Legal copy can be migrated from your current site or drafted with counsel."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="max-w-2xl text-sm text-[var(--foreground-muted)] leading-relaxed">
          Placeholder: add your finalized terms of use text here before launch.
        </p>
      </div>
    </>
  );
}
