import type { ReactNode } from "react";
import {
  BannerGlassTitle,
  type BannerGlassTitleLine,
} from "./banner-glass-title";
import "./site-hero-typography.css";

export type SiteHeroCopyProps = {
  eyebrow?: string;
  titleLines: BannerGlassTitleLine[];
  lead?: string;
  children?: ReactNode;
};

export function SiteHeroCopy({
  eyebrow,
  titleLines,
  lead,
  children,
}: SiteHeroCopyProps) {
  return (
    <div className="site-hero__copy">
      {eyebrow ? <p className="site-hero__eyebrow">{eyebrow}</p> : null}
      <BannerGlassTitle
        as="h1"
        lines={titleLines}
        className="site-hero__title"
      />
      {lead ? <p className="site-hero__lead">{lead}</p> : null}
      {children}
    </div>
  );
}
