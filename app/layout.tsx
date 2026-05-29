import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GsapRouteCleanup } from "../components/gsap-route-cleanup";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import "./globals.css";
import "./trust-marquee.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Amerilist Web Design | Data-Driven Digital Solutions",
    template: "%s | Amerilist Web Design",
  },
  description:
    "Responsive web design and development, email marketing, and digital media services—powered by data. Professional web design from Amerilist.",
  metadataBase: new URL("https://amerilistwebdesign.com"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="flex min-h-full flex-col font-sans">
        <GsapRouteCleanup />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
