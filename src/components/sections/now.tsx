"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { meta } from "@/lib/data/meta";

const SIGNALS = [
  { k: "graduating", v: "2026" },
  { k: "open_to_relocate", v: "true" },
  { k: "timezone", v: "IST ± 5h" },
  { k: "response_time", v: "< 24h" },
];

export function Now() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(meta.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="relative container-narrow py-28 md:py-44 border-t border-gold/15"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-gold" />
            Chapter 05
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="display text-[clamp(2.5rem,6.5vw,5.5rem)] text-ink leading-[0.98] tracking-[-0.025em]"
          >
            <span className="display-italic text-gold-bright">Let&apos;s</span>{" "}
            talk
            <span className="text-gold-bright">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 font-display text-xl text-ink-2 leading-snug max-w-xl"
          >
            <span className="display-italic text-ink-2">Graduating 2026.</span>{" "}
            Looking for full-time SDE roles where I can ship real product and
            grow near senior engineers. Also happy with internship → FTE.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={copy}
              className="magnetic"
              data-magnetic
            >
              <span className="opacity-60">$</span>
              <span>
                {copied ? "Copied ✓" : `Mail ${meta.email}`}
              </span>
              <span className="transition-transform group-hover:translate-x-1">
                {copied ? "✓" : "→"}
              </span>
            </button>
            <a
              href={meta.github}
              target="_blank"
              rel="noreferrer"
              className="magnetic-ghost"
              data-magnetic
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noreferrer"
              className="magnetic-ghost"
              data-magnetic
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </a>
          </motion.div>

          <div className="mt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex flex-wrap items-center gap-2">
            <span className="text-gold">$</span>
            <span>ping --vishal</span>
            <span className="text-dim">→</span>
            <span className="text-emerald">200 OK</span>
            <span className="text-dim">·</span>
            <span>await: reply</span>
            <span className="text-cobalt cursor-blink">_</span>
          </div>
        </div>

        <aside className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="hairline bg-bg-2/50 p-6 font-mono text-xs grain md:sticky md:top-32"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-1">
              // looking_for.json
            </div>
            <div className="text-cobalt">
              {`{`}
            </div>
            <ul className="pl-4 my-3 space-y-2">
              {meta.availableFor.map((r, i) => (
                <li
                  key={r}
                  className="text-ink leading-relaxed flex items-center gap-2"
                >
                  <span className="text-dim text-[10px] numeral w-4 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-dim">{`"`}</span>
                  <span className="text-ink flex-1">{r}</span>
                  <span className="text-dim">{`"`}</span>
                </li>
              ))}
            </ul>
            <div className="text-cobalt">{`}`}</div>

            <div className="mt-6 pt-5 border-t border-gold/15 space-y-2.5">
              {SIGNALS.map((s) => (
                <div
                  key={s.k}
                  className="flex items-center justify-between text-[11px]"
                >
                  <span className="text-dim uppercase tracking-[0.15em] text-[10px]">
                    {s.k}
                  </span>
                  <span
                    className={
                      s.v === "true" || s.v === "200 OK"
                        ? "text-emerald"
                        : "text-ink-2"
                    }
                  >
                    {s.v === "true" ? "true" : s.v}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gold/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-1">
                base
              </div>
              <div className="text-ink mt-0.5 font-display text-base">
                {meta.location}
              </div>
              <div className="text-muted text-[10px] mt-0.5">
                {meta.coordinates}
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </section>
  );
}
