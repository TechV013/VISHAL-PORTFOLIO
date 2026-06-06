import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-narrow min-h-[80vh] flex flex-col justify-center py-24">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-6 flex items-center gap-2">
        <span className="h-px w-8 bg-gold" />
        <span className="text-gold">404</span>
        <span>·</span>
        <span>Resource not found</span>
      </div>

      <h1 className="display text-[clamp(3rem,9vw,7.5rem)] text-ink leading-[0.95] tracking-[-0.025em]">
        <span className="display-italic text-gold-bright">Path</span> not found
        <span className="text-gold-bright">.</span>
      </h1>

      <p className="mt-8 max-w-xl font-display text-xl text-ink-2 leading-snug">
        <span className="display-italic text-ink-2">Error: ENOENT.</span> The
        page you&apos;re looking for doesn&apos;t exist — or it moved, or I
        never built it. Either way, here&apos;s the front door.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link href="/" className="magnetic" data-magnetic>
          <span>$</span>
          <span>cd ~/portfolio</span>
          <span>→</span>
        </Link>
        <Link
          href="/#work"
          className="magnetic-ghost"
          data-magnetic
        >
          <span>$ ls work/</span>
          <span>→</span>
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        <div className="hairline bg-bg-2/40 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
            $ fact.0
          </div>
          <div className="font-display text-base text-ink-2 leading-relaxed">
            I keep a notes file of every page that&apos;s ever 404&apos;d on my
            personal sites. This one is now in it.
          </div>
        </div>
        <div className="hairline bg-bg-2/40 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cobalt mb-2">
            $ fact.1
          </div>
          <div className="font-display text-base text-ink-2 leading-relaxed">
            Press{" "}
            <kbd className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold border border-gold/40 px-1.5 py-0.5">
              F12
            </kbd>{" "}
            for a small hello in the console.
          </div>
        </div>
      </div>
    </main>
  );
}
