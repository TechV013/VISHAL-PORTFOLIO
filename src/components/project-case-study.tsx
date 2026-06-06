"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { ProjectVisual } from "@/components/project-visual";

export function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <main className="container-narrow pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-8 flex items-center gap-2"
      >
        <Link
          href="/#work"
          className="text-cobalt hover:text-gold transition-colors"
        >
          ← work
        </Link>
        <span className="text-dim">/</span>
        <span className="text-gold">{project.slug}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-mono text-[10px] uppercase tracking-[0.2em] flex flex-wrap items-center gap-2 text-muted"
      >
        <span
          className={
            project.status === "shipped"
              ? "text-emerald"
              : project.status === "in-progress"
                ? "text-amber"
                : "text-dim"
          }
        >
          ● {project.status}
        </span>
        <span className="text-dim">·</span>
        <span className="text-ink-2 numeral">{project.year}</span>
        <span className="text-dim">·</span>
        <span className="text-cobalt">{project.role}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="display mt-5 text-[clamp(2.5rem,6vw,5rem)] text-ink leading-[0.98] tracking-[-0.025em]"
      >
        {project.name}
        <span className="text-gold-bright">.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-6 max-w-2xl font-display text-xl text-ink-2 leading-snug"
      >
        {project.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        {project.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="magnetic-ghost"
            data-magnetic
          >
            <span>{l.label}</span>
            <span>↗</span>
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-12 aspect-[16/9] hairline bg-bg-2/40 overflow-hidden"
      >
        <ProjectVisual
          type={project.visual}
          className="w-full h-full"
        />
      </motion.div>

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

      <CaseSection number="01" label="Problem" tag="$ cat problem.md">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          className="font-display text-[clamp(1.2rem,2vw,1.7rem)] leading-[1.5] text-ink"
        >
          {project.problem}
        </motion.p>
      </CaseSection>

      <CaseSection number="02" label="Approach" tag="$ ./build.sh">
        <div className="space-y-4">
          {project.approach.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="flex gap-4"
            >
              <span className="font-mono text-[10px] text-gold numeral shrink-0 mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-base text-ink-2 leading-relaxed">
                {p}
              </p>
            </motion.div>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="03"
        label="Architecture"
        tag="$ tree ./layers"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.architecture.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="hairline bg-bg-2/40 p-5 grain"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                <span className="numeral">
                  layer_{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="font-display text-xl text-ink mt-2 tracking-[-0.01em]">
                {a.label}
              </div>
              <div className="text-sm text-ink-2 mt-2 leading-relaxed font-display">
                {a.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="04"
        label="Decisions"
        tag="$ git log --grep=why"
      >
        <div className="space-y-8">
          {project.decisions.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="relative pl-6"
            >
              <span
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-gold/70 via-gold/20 to-transparent"
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cobalt">
                commit_{String(i + 1).padStart(2, "0")} · {d.title}
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-ink mt-2 leading-snug tracking-[-0.01em]">
                {d.title}
              </h3>
              <p className="mt-3 text-ink-2 leading-relaxed font-display text-base">
                {d.body}
              </p>
            </motion.div>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="05"
        label="Reflections"
        tag="$ cat TODO.nice-to-have"
      >
        <div className="space-y-5">
          {project.reflections.map((r, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="relative pl-6"
            >
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-rose/70 via-rose/20 to-transparent"
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose mb-1.5">
                ↳ TODO_{i + 1}
              </div>
              <p className="font-display text-lg text-ink leading-snug">
                {r}
              </p>
            </motion.blockquote>
          ))}
        </div>
      </CaseSection>

      <section className="mt-24 pt-12 border-t border-gold/15">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-5">
          // nav.next
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/#work"
            className="group block p-6 hairline hover:border-gold/60 transition-colors"
            data-magnetic
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cobalt mb-3">
              ← all work
            </div>
            <div className="font-display text-2xl text-ink group-hover:text-gold transition-colors">
              Back to index
            </div>
          </Link>
          <Link
            href="/#contact"
            className="group block p-6 hairline hover:border-gold/60 transition-colors"
            data-magnetic
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
              → contact
            </div>
            <div className="font-display text-2xl text-ink group-hover:text-gold transition-colors">
              Say hi
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

function CaseSection({
  number,
  label,
  tag,
  children,
}: {
  number: string;
  label: string;
  tag: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-3">
        <div className="md:sticky md:top-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold flex items-center gap-2">
            <span className="numeral">{number}</span>
          </div>
          <div className="mt-2 font-display text-3xl text-ink leading-tight tracking-[-0.02em]">
            {label}
            <span className="text-gold-bright">.</span>
          </div>
          <div className="mt-3 font-mono text-[10px] text-dim">{tag}</div>
        </div>
      </div>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}
