"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { meta } from "@/lib/data/meta";
import { statusPills } from "@/lib/data/meta";

const HeroScene = dynamic(
  () => import("@/components/three/here-scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Subtle gold grain + grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(38 60% 60% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(38 60% 60% / 0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="container-narrow relative z-10 grid min-h-[100svh] grid-rows-[auto_1fr_auto] py-24 md:py-28"
      >
        {/* Top meta strip */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="flex items-center gap-1.5 text-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald pulse" />
              <span>Online</span>
            </span>
            <span className="text-dim">/</span>
            <span className="numeral text-ink-2">{date || "2026-06-06"}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden md:flex items-center gap-3"
          >
            <span className="text-dim">loc</span>
            <span className="text-ink-2">{meta.coordinates}</span>
          </motion.div>
        </div>

        {/* Main hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6 flex items-center gap-2"
            >
              <span className="h-px w-6 bg-gold" />
              <span>A portfolio in motion</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="display text-[clamp(2.75rem,8vw,7rem)] text-ink leading-[0.98] tracking-[-0.025em]"
            >
              <span className="block">Vishal</span>
              <span className="block">
                <span className="display-italic text-gold-bright">Jangir</span>
                <span className="text-gold-bright animate-pulse">.</span>
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-8 font-display text-2xl md:text-3xl text-ink-2 leading-snug max-w-2xl"
            >
              <span className="display-italic text-ink-2">A software engineer from Jaipur</span>
              <span className="text-ink-2"> — building </span>
              <span className="text-ink">full-stack systems</span>
              <span className="text-ink-2">, shipping them to the </span>
              <span className="text-cobalt">cloud</span>
              <span className="text-ink-2">, and trying to leave the code more legible than I found it.</span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-10 flex flex-wrap gap-2"
            >
              {statusPills.map((p) => (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] hairline text-ink-2 bg-bg-2/40"
                >
                  <span className="text-gold">{p.glyph}</span>
                  <span>{p.label}</span>
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="magnetic"
                data-magnetic
              >
                <span>View selected work</span>
                <span>→</span>
              </a>
              <a
                href={`mailto:${meta.email}`}
                className="magnetic-ghost"
                data-magnetic
              >
                <span>Mail vishal</span>
              </a>
            </motion.div>
          </div>

          {/* 3D scene — right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[380px] lg:h-[520px] relative"
          >
            <div className="absolute inset-0 hairline bg-bg-2/30">
              <HeroScene />
            </div>
            {/* Corner labels */}
            <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gold bg-bg/80 backdrop-blur-sm px-2 py-1">
              <span className="text-gold/60">[</span> arch.os <span className="text-gold/60">·</span> 6 svc <span className="text-gold/60">]</span>
            </div>
            <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cobalt bg-bg/80 backdrop-blur-sm px-2 py-1">
              live · 60fps
            </div>
            <div className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              <div>core: <span className="text-gold">gold · pbr</span></div>
              <div>plane: <span className="text-cobalt">signal · wireframe</span></div>
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald mr-1.5 pulse" />
              rendering
            </div>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center gap-2 text-dim"
          >
            <span className="text-gold/60">↓</span>
            <span>scroll — chapters continue</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="hidden md:flex items-center gap-3 text-dim"
          >
            <span>ed. 02</span>
            <span>·</span>
            <span>build #b3e8c17</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
