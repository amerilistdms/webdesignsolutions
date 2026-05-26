import Link from "next/link";
import { SocialLinks } from "./social-links";

type TopBarProps = {
  scrolled: boolean;
};

export function TopBar({ scrolled }: TopBarProps) {
  return (
    <div
      className={`text-[13px] text-white transition-[background-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "bg-[var(--color-topbar)]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-topbar)]/75"
          : "bg-[var(--color-topbar)]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--color-topbar)]/88"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-3 py-2 sm:px-5 lg:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link
            href="/blog"
            className="font-medium tracking-wide text-white transition hover:text-white/80"
          >
            Blog
          </Link>
          <Link
            href="/get-started"
            className="font-medium tracking-wide text-white transition hover:text-white/80"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <SocialLinks variant="header" />
          <a
            href="tel:+18004572899"
            className="whitespace-nowrap text-[21px] font-semibold leading-none tabular-nums tracking-tight text-white transition hover:text-white/80"
          >
            1.800.457.2899
          </a>
        </div>
      </div>
    </div>
  );
}
