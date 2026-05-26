"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MainNav } from "./main-nav";
import { TopBar } from "./top-bar";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-chrome print:hidden fixed inset-x-0 top-0 z-50 text-white">
      <TopBar scrolled={scrolled} />
      <MainNav key={pathname} scrolled={scrolled} />
    </div>
  );
}
