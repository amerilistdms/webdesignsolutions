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
      className="main-nav-link rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300"
      data-active={active ? "true" : undefined}
    >
      {label}
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

  const pillSurface = scrolled
    ? "main-nav-bar--scrolled border-white/20 bg-[var(--color-nav)]/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-nav)]/28"
    : "border-transparent bg-transparent shadow-none";

  const mobilePanel = scrolled
    ? "border-white/10 bg-[var(--color-nav)]/92 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-nav)]/78"
    : "border-white/15 bg-black/45 backdrop-blur-xl supports-[backdrop-filter]:bg-black/35";

  return (
    <header className="border-0 bg-transparent shadow-none">
      <div
        className={`main-nav-bar mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-2.5 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-out sm:px-4 ${pillSurface}`}
      >
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
            className="main-nav-logo"
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
          className="main-nav-menu-btn inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 p-2 text-white transition-[background-color,border-color] duration-300 lg:hidden"
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
        <div
          id="mobile-nav"
          className={`main-nav-mobile mt-2 overflow-hidden rounded-2xl border lg:hidden ${mobilePanel}`}
        >
          <nav
            className="flex flex-col gap-0.5 px-3 py-4"
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
                  className={`main-nav-link rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                    active ? "bg-white/12 text-white" : "text-white/85 hover:bg-white/6"
                  }`}
                  data-active={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
