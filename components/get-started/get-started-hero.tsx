"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { SiteHeroCopy } from "../shared/site-hero-copy";
import { SiteHero, SITE_HERO_PIN } from "../shared/site-hero";
import { getStartedBanner } from "./get-started-data";
import "./get-started-hero.css";

export function GetStartedHero() {
  return (
    <SiteHero
      className="overflow-hidden text-white"
      pinVH={SITE_HERO_PIN.pinVH}
      scrub={SITE_HERO_PIN.scrub}
      contentClassName="get-started-hero__content"
      backdrop={
        <>
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${getStartedBanner})` }}
          />
          <div className="absolute inset-0 bg-[#040c1c]/65" />
        </>
      }
      background={
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(56,189,248,0.28),transparent_55%),linear-gradient(180deg,transparent_0%,#060d1a_92%)]" />
          <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-400/15 blur-[100px]" />
        </>
      }
    >
      <div className="get-started-hero__grid">
        <SiteHeroCopy
          eyebrow="Get started"
          titleLines={[
            { text: "Start a", tone: "default" },
            { text: "Creative", tone: "accent" },
            { text: "Revolution", tone: "muted" },
          ]}
          lead="We would love to hear from you. Share your project below—or call or email us with your questions."
        />

        <div className="get-started-hero__contact">
          <a
            href="tel:18004572899"
            className="get-started-hero__contact-card"
          >
            <Phone className="h-4 w-4 text-[var(--color-accent)]" />
            1.800.457.2899
          </a>
          <a
            href="mailto:sales@amerilistwebdesign.com"
            className="get-started-hero__contact-card"
          >
            <Mail className="h-4 w-4 text-[var(--color-accent)]" />
            sales@amerilistwebdesign.com
          </a>
          <p className="get-started-hero__contact-note">
            Prefer a conversation?{" "}
            <Link href="/services" className="text-[var(--color-accent)] hover:underline">
              See our services
            </Link>
          </p>
        </div>
      </div>
    </SiteHero>
  );
}
