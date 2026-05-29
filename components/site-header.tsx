"use client";

import { useEffect, useState } from "react";
import { MainNav } from "./main-nav";

const SCROLL_CLASS = "site-scrolled";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const onScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
      root.classList.toggle(SCROLL_CLASS, isScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.classList.remove(SCROLL_CLASS);
    };
  }, []);

  return (
    <div className="site-chrome pointer-events-none fixed inset-x-0 top-0 z-50 print:hidden">
      <div className="pointer-events-auto px-4 pt-4 sm:px-6 lg:px-8">
        <MainNav scrolled={scrolled} />
      </div>
    </div>
  );
}
