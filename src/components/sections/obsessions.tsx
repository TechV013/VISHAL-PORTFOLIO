"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { obsessions } from "@/lib/data/obsessions";
import { ObsessionStatic } from "@/components/three/obsession-field";

const ObsessionField = dynamic(
  () =>
    import("@/components/three/obsession-field").then((m) => m.ObsessionField),
  { ssr: false, loading: () => null },
);

export function Obsessions() {
  return (
    <section
      id="now"
      className="relative py-28 md:py-44 border-t border-gold/15 bg-bg-2/30 grain"
    >
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-gold" />
              Chapter 03
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              className="display text-[clamp(2.5rem,5.5vw,4.5rem)] text-ink leading-[1.02] tracking-[-0.025em]"
            >
              What I do
              <span className="display-italic text-gold-bright"> for fun</span>
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
              Seven processes running constantly. They keep me a person, not a
              job title.
            </motion.p>
            <div className="mt-5 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-dim">
                <span className="text-gold numeral">
                  {String(obsessions.length).padStart(2, "0")}
                </span>{" "}
                obsessions
              </span>
              <span className="text-dim">·</span>
              <span className="text-dim">Live · interactive</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mb-20"
        >
          <ObsessionField items={obsessions} />
        </motion.div>

        <ObsessionStatic items={obsessions} />

        <div className="mt-20 font-mono text-[10px] uppercase tracking-[0.3em] text-dim flex flex-wrap items-center justify-center gap-2">
          <span className="text-gold">$</span>
          <span>date: 2026-06-06</span>
          <span className="text-dim">·</span>
          <span>next rotation: 2026-07-01</span>
          <span className="text-cobalt cursor-blink">_</span>
        </div>
      </div>
    </section>
  );
}
