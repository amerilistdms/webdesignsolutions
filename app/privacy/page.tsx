import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AmeriList privacy policy: data handling, compliance, consumer rights, opt-out, and contact information for privacy requests.",
};

function getPrivacyBodyHtml(): string {
  const filePath = path.join(process.cwd(), "content", "privacy-policy-body.html");
  return fs.readFileSync(filePath, "utf-8");
}

export default function PrivacyPage() {
  const bodyHtml = getPrivacyBodyHtml();

  return (
    <>
      <section className="legal-hero">
        <p className="legal-hero__badge">Legal</p>
        <h1>
          Privacy <span className="highlight">Policy</span>
        </h1>
        <p className="legal-hero__lead">
          Last revised October 20, 2025. AmeriList is committed to lawful, transparent, and
          responsible data management.
        </p>
      </section>
      <section className="legal-content">
        <div
          className="legal-content-inner"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </section>
    </>
  );
}
