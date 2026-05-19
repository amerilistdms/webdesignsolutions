import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import "./globals.css";
import "./trust-marquee.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
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
    <html lang="en" className={`${raleway.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1 pt-[var(--site-header-offset)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
