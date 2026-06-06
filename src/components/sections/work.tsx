"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/lib/data/projects";
import { ProjectVisual } from "@/components/project-visual";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), {
    stiffness: 200,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), {
    stiffness: 200,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-15% 0px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
    >
      <div
        className={`md:col-span-7 ${index % 2 === 1 ? "md:order-2" : ""}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div
          ref={ref}
          style={{
            rotateX: rx,
            rotateY: ry,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          <Link
            href={`/work/${project.slug}`}
            className="group block relative hairline bg-bg-2/40 overflow-hidden"
            data-magnetic
          >
            <div className="aspect-[16/10] relative">
              <ProjectVisual
                type={project.visual}
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* gold tint on hover */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/0 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gold bg-bg/80 backdrop-blur-sm px-2 py-1">
              [{project.slug}.case]
            </div>
            <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cobalt bg-bg/80 backdrop-blur-sm px-2 py-1">
              ↗ open
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-2 bg-bg/80 backdrop-blur-sm px-2 py-1">
              <span className="text-gold/70">{project.year}</span>
              <span className="text-dim mx-1.5">·</span>
              <span className="text-ink-2">{project.role}</span>
            </div>
          </Link>
        </motion.div>
      </div>

      <div className={`md:col-span-5 ${index % 2 === 1 ? "md:order-1" : ""}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-3 flex items-center gap-2"
        >
          <span className="numeral">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-dim">/</span>
          <span className="text-muted">
            {String(projects.length).padStart(2, "0")}
          </span>
          <span className="text-dim">·</span>
          <span
            className={
              project.status === "shipped"
                ? "text-emerald"
                : project.status === "in-progress"
                  ? "text-amber"
                  : "text-dim"
            }
          >
            {project.status}
          </span>
        </motion.div>

        <h3 className="display text-3xl md:text-4xl text-ink leading-[1.05] tracking-[-0.02em]">
          {project.name}
        </h3>

        <p className="mt-5 font-display text-lg text-ink-2 leading-snug">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1 hairline text-ink-2"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-5">
          <Link
            href={`/work/${project.slug}`}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold"
            data-magnetic
          >
            <span>Read case study</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href={project.links[0]?.href}
            target="_blank"
            rel="noreferrer"
            className="ink-link font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2"
            data-magnetic
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="relative container-narrow py-28 md:py-44 border-t border-gold/15"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
        <div className="md:col-span-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-gold" />
            Chapter 01
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            className="display text-[clamp(2.5rem,5.5vw,4.5rem)] text-ink leading-[1.02] tracking-[-0.025em]"
          >
            Selected
            <span className="display-italic text-gold-bright"> work</span>
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
            Two case studies I keep coming back to. Each one taught me something
            I now refuse to ship without.
          </motion.p>
          <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className="text-dim">
              <span className="text-gold numeral">
                {String(projects.length).padStart(2, "0")}
              </span>{" "}
              projects
            </span>
            <span className="text-dim">·</span>
            <span className="text-dim">2025 batch</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-28">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
