import type { Metadata } from "next";
import { PageHeading } from "../../components/page-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Amerilist Web Design.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeading
        title="Privacy policy"
        description="This page will host the full privacy policy for Amerilist Web Design. Legal copy can be migrated from your current site or drafted with counsel."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="max-w-2xl text-sm text-[var(--foreground-muted)] leading-relaxed">
          Placeholder: add your finalized privacy policy text here before launch.
        </p>
      </div>
    </>
  );
}
