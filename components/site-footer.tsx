import Link from "next/link";
import { mainNavLinks } from "./nav-links";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="mt-auto border-t border-black/10 bg-[var(--color-footer)] text-[var(--color-footer-fg)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Amerilist Web Design
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              Data-driven digital solutions: responsive web design and
              development, email marketing, and digital media—built to perform.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-white/50">
              Follow us
            </p>
            <div className="mt-3">
              <SocialLinks variant="footer" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Navigate</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
              {mainNavLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a
                  href="mailto:sales@amerilistwebdesign.com"
                  className="transition hover:text-white"
                >
                  sales@amerilistwebdesign.com
                </a>
              </li>
              <li className="leading-relaxed">
                10 Esquire Rd Ste 11B
                <br />
                New City, NY 10956
              </li>
              <li>
                <a
                  href="tel:+18004572899"
                  className="font-medium tabular-nums text-white transition hover:text-[var(--color-accent)]"
                >
                  1 800 457 2899
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} AWD, a division of The Amerilist Companies.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
