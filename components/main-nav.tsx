"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNavLinks } from "./nav-links";

type MainNavProps = {
  scrolled: boolean;
};

function NavLinkDesktop({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative px-3 py-2 text-sm font-medium transition-colors ${
        active ? "text-white" : "text-white/85 hover:text-white"
      }`}
    >
      {label}
      <span
        className={`pointer-events-none absolute bottom-0 left-3 right-3 h-0.5 origin-left rounded-full bg-[var(--color-accent)] transition-transform duration-200 ease-out ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
        aria-hidden
      />
    </Link>
  );
}

export function MainNav({ scrolled }: MainNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const barSurface = scrolled
    ? "border-white/10 bg-[var(--color-nav)]/76 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-nav)]/58 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
    : "border-transparent bg-transparent shadow-none";

  const mobilePanel = scrolled
    ? "border-white/10 bg-[var(--color-nav)]/92 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-nav)]/78"
    : "border-white/15 bg-black/45 backdrop-blur-xl supports-[backdrop-filter]:bg-black/35";

  return (
    <header
      className={`border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-out ${barSurface}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-3 sm:px-5 lg:px-6">
        <Link
          href="/"
          className="relative flex shrink-0 items-center gap-2 outline-offset-4"
          aria-label="Amerilist Web Design home"
        >
          <Image
            src="/webdesign_white.png"
            alt="Amerilist Web Design"
            width={200}
            height={48}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {mainNavLinks.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <NavLinkDesktop
                key={href}
                href={href}
                label={label}
                active={active}
              />
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/5 p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className={`border-t lg:hidden ${mobilePanel}`}>
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-0.5 px-3 py-4 sm:px-5 lg:px-6"
            aria-label="Mobile primary"
          >
            {mainNavLinks.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group relative rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/90 hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`absolute bottom-2 left-3 top-2 w-0.5 rounded-full bg-[var(--color-accent)] transition-opacity duration-200 ${
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    aria-hidden
                  />
                  <span className="pl-2">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
