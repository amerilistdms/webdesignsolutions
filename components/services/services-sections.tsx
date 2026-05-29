"use client";

import ArchShowcase from "@/components/ArchShowcase/ArchShowcase";
import { PageFooterCta } from "@/components/shared/page-footer-cta";

export function ServicesSections() {
  return (
    <ArchShowcase
      footer={
        <PageFooterCta
          embedded
          id="services-footer-cta-title"
          eyebrow="Ready to grow online?"
          titleLines={[
            { text: "The right services,", tone: "default" },
            { text: "one team.", tone: "accent" },
          ]}
          lead="From web design and SEO to email and data—we'll build a stack that fits your goals and budget."
          ctaText="Start Your Project"
        />
      }
    />
  );
}
