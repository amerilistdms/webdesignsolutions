import type { ElementType } from "react";
import "../home/home-hero.css";
import "./banner-glass-title.css";

export type BannerGlassTitleLine = {
  text: string;
  tone?: "default" | "accent" | "muted";
};

type BannerGlassTitleProps = {
  as?: ElementType;
  id?: string;
  lines: BannerGlassTitleLine[];
  className?: string;
  align?: "left" | "center";
  size?: "default" | "compact";
  showBar?: boolean;
};

function joinClasses(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function BannerGlassTitle({
  as: Tag = "h2",
  id,
  lines,
  className,
  align = "left",
  size = "default",
  showBar = true,
}: BannerGlassTitleProps) {
  return (
    <Tag
      id={id}
      className={joinClasses(
        "banner-glass-title home-hero-title",
        align === "center" && "banner-glass-title--center",
        size === "compact" && "banner-glass-title--compact",
        className,
      )}
    >
      {showBar && align !== "center" ? (
        <span className="home-hero-title__bar" aria-hidden />
      ) : null}
      {lines.map((line) => (
        <span
          key={line.text}
          className={joinClasses(
            "home-hero-glass-line",
            line.tone === "accent" && "home-hero-title__accent",
            line.tone === "muted" && "home-hero-title__muted",
          )}
          data-text={line.text}
        >
          {line.text}
        </span>
      ))}
    </Tag>
  );
}
