"use client";

import { motion } from "framer-motion";
import { stack } from "@/lib/data/obsessions";

const ICON = ["◆", "◇", "◈", "✦", "✧", "❖", "❀"];

export function Stack() {
  const groups = Object.entries(stack);
  return (
    <section
      id="stack"
      className="relative container-narrow py-28 md:py-44 border-t border-gold/15"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
        <div className="md:col-span-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-gold" />
            Chapter 04
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="display text-[clamp(2.5rem,5.5vw,4.5rem)] text-ink leading-[1.02] tracking-[-0.025em]"
          >
            <span className="display-italic text-gold-bright">Stack</span>
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
            The tools I keep coming back to. Ordered by how often I actually
            reach for them — not by how good they look on a CV.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {groups.map(([group, items], i) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="hairline bg-bg-2/30 p-6 grain"
          >
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-xl text-ink">
                <span className="text-gold/70 mr-2">{ICON[i % ICON.length]}</span>
                {group}
              </h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-dim numeral">
                n={items.length}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-gold/40 via-gold/10 to-transparent mb-4" />
            <ul className="space-y-1.5">
              {items.map((item, j) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-2 group"
                  data-magnetic
                >
                  <span className="flex items-center gap-2">
                    <span className="text-dim text-[9px] numeral w-5 text-right">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink-2 group-hover:text-gold-bright transition-colors">
                      {item}
                    </span>
                  </span>
                  <span className="text-dim group-hover:text-gold transition-colors">
                    →
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
