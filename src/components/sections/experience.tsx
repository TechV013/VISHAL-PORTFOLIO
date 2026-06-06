"use client";

import { motion } from "framer-motion";
import { experiences, education } from "@/lib/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative container-narrow py-28 md:py-44 border-t border-gold/15"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
        <div className="md:col-span-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-gold" />
            Chapter 02
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="display text-[clamp(2.5rem,5.5vw,4.5rem)] text-ink leading-[1.02] tracking-[-0.025em]"
          >
            <span className="display-italic text-gold-bright">Experience</span>
            <span className="text-gold-bright">.</span>
          </motion.h2>
        </div>
        <div className="md:col-span-5 md:pt-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-lg text-ink-2 leading-snug"
          >
            Three internships, each in a different part of the stack — IoT at
            the edge, ML in the middle, and DevOps at the cloud.
          </motion.p>
          <div className="mt-5 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className="text-dim">
              <span className="text-gold numeral">3</span> internships
            </span>
            <span className="text-dim">·</span>
            <span className="text-dim">2024 → 2025</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8">
          <ol className="space-y-10">
            {experiences.map((e, i) => (
              <motion.li
                key={e.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                className="group relative pl-8"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent group-hover:from-cobalt transition-colors"
                />
                <span
                  className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold group-hover:bg-cobalt group-hover:shadow-gold-soft transition-all"
                  aria-hidden
                />
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex flex-wrap items-center gap-2">
                  <span className="text-gold numeral">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-dim">·</span>
                  <span className="text-ink-2">
                    {e.start} <span className="text-dim">→</span> {e.end}
                  </span>
                  <span className="text-dim">·</span>
                  <span className="text-cobalt">{e.role}</span>
                </div>
                <h3 className="display text-2xl md:text-3xl text-ink mt-2 tracking-[-0.02em]">
                  {e.company}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  {`>`} {e.project}
                </p>
                <p className="mt-3 text-ink-2 text-base leading-relaxed font-display">
                  {e.body}
                </p>
                {e.bullets && (
                  <ul className="mt-4 space-y-1.5 font-mono text-[11px] text-ink-2">
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 leading-relaxed"
                      >
                        <span className="text-gold shrink-0">├─</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        <aside className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="md:sticky md:top-32 hairline bg-bg-2/50 p-6 grain"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-1">
              // education.json
            </div>
            <div className="font-mono text-[10px] text-cobalt">
              {`{ entries: ${education.length} }`}
            </div>

            <ol className="mt-5 space-y-5">
              {education.map((ed, i) => (
                <li key={ed.school}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    edu_{i + 1}
                  </div>
                  <div className="font-display text-base text-ink mt-0.5 leading-tight">
                    {ed.school}
                  </div>
                  <div className="text-ink-2 text-[13px] mt-0.5">
                    {ed.degree}
                  </div>
                  <div className="font-mono text-[10px] text-muted mt-1">
                    {ed.start}–{ed.end}{" "}
                    <span className="text-gold">· {ed.detail}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 pt-5 border-t border-gold/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cobalt mb-3">
                // core.cs
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["DSA", "OOP", "DBMS", "OS", "Networks", "SDLC"].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 hairline text-ink-2"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </section>
  );
}
