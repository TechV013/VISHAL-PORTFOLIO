"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { meta } from "@/lib/data/meta";

const NAV = [
  { href: "#work", label: "Work", num: "01" },
  { href: "#experience", label: "Experience", num: "02" },
  { href: "#now", label: "Now", num: "03" },
  { href: "#contact", label: "Contact", num: "04" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);
  const [now, setNow] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setNow(`${hh}:${mm} IST`);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          opacity,
          backgroundColor: "hsl(218 47% 8% / 0.78)",
          backdropFilter: "blur(16px) saturate(140%)",
          borderBottom: "1px solid hsl(38 60% 60% / 0.12)",
        }}
      />
      <div className="container-narrow flex items-center justify-between py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm"
          data-magnetic
        >
          <span className="text-gold">✦</span>
          <span className="text-ink font-medium">{meta.shortName}</span>
          <span className="text-dim">/</span>
          <span className="text-muted">{meta.initials}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em]">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group flex items-baseline gap-1.5 text-ink-2 hover:text-gold transition-colors"
              data-magnetic
            >
              <span className="text-dim group-hover:text-gold-bright text-[9px] tracking-widest">
                {n.num}
              </span>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden lg:inline font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            {now}
          </span>
          <a
            href={`mailto:${meta.email}`}
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border border-gold/40 text-gold hover:border-gold-bright hover:text-gold-bright transition-colors"
            data-magnetic
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald pulse" />
            <span>Available</span>
          </a>
        </div>
      </div>
      <div
        aria-hidden
        className={`h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-opacity ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.header>
  );
}
