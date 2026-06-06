"use client";

import { motion } from "framer-motion";

const STATEMENT =
  "I'm a final-year CS student from Jaipur who likes to live near the seam — between software and the people who use it, between the cloud and the bit. I build things that work in production, then I write about why they work. I read long-form, I play cricket on weekends, and I'm suspicious of code that doesn't have a user in mind.";

const TAGS = [
  "shipping",
  "writing-about-it",
  "clean-abstractions",
  "honest-error-states",
  "tasteful-motion",
  "long-running-systems",
  "small-sharp-tools",
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative container-narrow py-28 md:py-44"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="md:sticky md:top-32"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
              <span className="inline-block h-px w-8 bg-gold mr-2 align-middle" />
              Chapter 00
            </div>
            <h2 className="display text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-0.02em]">
              About
              <span className="display-italic text-gold-bright">.</span>
            </h2>
            <div className="mt-6 space-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              <div>
                <span className="text-dim">read_time</span>{" "}
                <span className="text-ink-2 numeral">30s</span>
              </div>
              <div>
                <span className="text-dim">words</span>{" "}
                <span className="text-ink-2 numeral">~85</span>
              </div>
              <div>
                <span className="text-dim">coffee</span>{" "}
                <span className="text-gold-bright">required</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-6 flex items-center gap-2"
          >
            <span className="text-gold">$</span>
            <span>cat about.md</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.5] text-ink"
          >
            {STATEMENT}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="mt-14"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-4 flex items-center gap-2">
              <span className="text-gold">$</span>
              <span>grep -r "care-about" ./life</span>
              <span className="text-ink-2">--tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] hairline text-ink-2 hover:text-gold hover:border-gold/60 transition-colors"
                  data-magnetic
                >
                  <span className="text-gold/60 numeral">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
