import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { KatanaCursor } from "@/components/cursor/katana-cursor";
import { ConsoleMessage } from "@/components/console-message";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { meta } from "@/lib/data/meta";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vishaljangir.vercel.app"),
  title: {
    default: `${meta.name} · ${meta.role}`,
    template: `%s — ${meta.name}`,
  },
  description: meta.tagline,
  keywords: [
    "Vishal Jangir",
    "Software Engineer",
    "Full Stack",
    "DevOps",
    "Cloud",
    "AI/ML",
    "Jaipur",
    "Portfolio",
  ],
  authors: [{ name: meta.name }],
  creator: meta.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: `${meta.name} · ${meta.role}`,
    description: meta.tagline,
    siteName: meta.name,
    images: [
      { url: "/og.svg", width: 1200, height: 630, alt: meta.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.name} · ${meta.role}`,
    description: meta.tagline,
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jbMono.variable}`}
    >
      <body className="font-body antialiased min-h-screen flex flex-col">
        <SmoothScroll>
          <KatanaCursor />
          <ConsoleMessage />
          <SiteHeader />
          <div className="flex-1 relative z-10">{children}</div>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
