"use client";

import { useEffect, useState } from "react";
import { meta } from "@/lib/data/meta";

const BUILD_HASH = "b3e8c17";

const ROUTES = [
  { label: "GitHub", href: meta.github, color: "text-gold" },
  { label: "LinkedIn", href: meta.linkedin, color: "text-cobalt" },
  { label: "Email", href: `mailto:${meta.email}`, color: "text-rose" },
];

const META = [
  { k: "Origin", v: meta.location },
  { k: "Coordinates", v: meta.coordinates },
  { k: "Stack", v: "Next.js · TypeScript · R3F" },
  { k: "Build", v: `#${BUILD_HASH}` },
];

export function SiteFooter() {
  const [stamp, setStamp] = useState("");
  const [now, setNow] = useState("");

  useEffect(() => {
    const d = new Date();
    setStamp(d.toISOString().slice(0, 10));
    const tick = () => {
      const t = new Date();
      const hh = t.getHours().toString().padStart(2, "0");
      const mm = t.getMinutes().toString().padStart(2, "0");
      setNow(`${hh}:${mm}`);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 mt-32 border-t border-gold/15 bg-bg-2/40 grain">
      <div className="container-narrow py-16 grid gap-12 md:grid-cols-12 font-mono text-xs">
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-baseline gap-2">
            <span className="text-gold text-sm">✦</span>
            <span className="font-display text-2xl text-ink">{meta.name}</span>
          </div>
          <p className="font-display text-xl text-ink-2 leading-snug max-w-md">
            <span className="display-italic text-gold-bright">A software engineer from Jaipur</span>
            <span className="text-ink-2">
              {" "}— building systems that explain themselves, and learning in public.
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5 text-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald pulse" />
              <span>Open to roles</span>
            </span>
            <span className="text-dim">·</span>
            <span className="text-dim">Responds in &lt; 24h</span>
            <span className="text-dim">·</span>
            <span className="text-dim">Local {now} IST</span>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="text-dim text-[10px] uppercase tracking-[0.2em] mb-4">
            // routes
          </div>
          <ul className="space-y-2">
            {ROUTES.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  className="group flex items-center gap-2 text-ink-2 hover:text-ink transition-colors"
                  target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                  data-magnetic
                >
                  <span className={`${r.color} opacity-80 group-hover:opacity-100`}>
                    →
                  </span>
                  <span className="group-hover:underline underline-offset-4 decoration-gold/60">
                    {r.label}
                  </span>
                  <span className="text-dim text-[10px]">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-dim text-[10px] uppercase tracking-[0.2em] mb-4">
            // system
          </div>
          <ul className="space-y-2 text-[11px]">
            {META.map((m) => (
              <li key={m.k} className="flex items-baseline justify-between gap-3">
                <span className="text-dim uppercase tracking-[0.15em] text-[9px]">
                  {m.k}
                </span>
                <span className="text-ink-2 text-right">{m.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-narrow pb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 text-[10px] uppercase tracking-[0.2em] text-dim font-mono">
          <span>
            © {new Date().getFullYear()} {meta.name}
            <span className="text-dim mx-2">·</span>
            <span className="text-gold/70">All rights reserved</span>
          </span>
          <span>
            Last updated{" "}
            <span className="text-ink-2 numeral">{stamp}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
