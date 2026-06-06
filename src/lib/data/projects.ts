export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  status: "shipped" | "in-progress" | "archived";
  stack: string[];
  problem: string;
  approach: string[];
  architecture: { label: string; detail: string }[];
  decisions: { title: string; body: string }[];
  reflections: string[];
  links: { label: string; href: string }[];
  accent: "marigold" | "clay" | "ink";
  visual: "cognitive" | "room";
};

export const projects: Project[] = [
  {
    slug: "cognitive-monitoring",
    name: "Cognitive Monitoring System",
    tagline:
      "An ML platform that reads keystrokes, mouse drift, and idle patterns to predict stress in real time.",
    year: "2025",
    role: "Full-stack engineer",
    status: "shipped",
    stack: [
      "React",
      "Node.js",
      "Express",
      "Python",
      "scikit-learn",
      "PostgreSQL",
      "Tailwind",
    ],
    problem:
      "Most stress-detection tools need a wearable or a clinical setting. I wanted something that could read a developer or student's cognitive state from signals they already generate — typing rhythm, mouse micro-movements, idle windows — and surface it as a trend they can act on before burnout lands.",
    approach: [
      "Built a lightweight event-collector that runs in the browser and timestamps keystrokes, mouse trajectories, scroll bursts, and idle gaps at ~30Hz.",
      "Aggregated events into rolling features (flight time, dwell, jitter, idle ratio) and pushed them through a feature pipeline that normalises per-user baselines — so a fast typist isn't labelled 'stressed' just because they type fast.",
      "Trained a gradient-boosted classifier on a labelled session dataset to predict a 0–100 stress score in 60s windows, with confidence bands the UI can display honestly.",
      "Wrapped it in a React dashboard with trend lines, weekly heatmaps, and 'quiet hours' suggestions. Backend on Node + Express, persistence on PostgreSQL, model served as a small Python sidecar.",
    ],
    architecture: [
      { label: "Capture", detail: "Browser event collector (~30Hz, ~2KB/min)" },
      { label: "Features", detail: "Rolling aggregates, per-user baseline normalisation" },
      { label: "Model", detail: "Gradient-boosted classifier, 60s windows" },
      { label: "API", detail: "Node + Express, score + confidence payload" },
      { label: "UI", detail: "React + Tailwind, trends + heatmap + nudges" },
      { label: "Storage", detail: "PostgreSQL (events), Redis (hot window)" },
    ],
    decisions: [
      {
        title: "Per-user baselines, not absolute thresholds",
        body: "Typing 120wpm calmly is not the same as typing 120wpm under pressure. We normalise each feature against a rolling 14-day baseline so the model reads change, not raw speed.",
      },
      {
        title: "Confidence bands, not point estimates",
        body: "A stress score without uncertainty is dangerous — people anchor to it. We surface 80% confidence intervals and the UI visibly shrinks when confidence is low.",
      },
      {
        title: "Browser capture, not OS-level hooks",
        body: "Anything that needs a native agent or accessibility permission kills adoption. Browser events get us 85% of the signal with zero install friction.",
      },
    ],
    reflections: [
      "I'd add an opt-in 'focus mode' that doesn't just log — it actively mutes notifications when the stress trend crosses a threshold, and lets the user override with a reason.",
      "The model is biased toward my own session patterns. Real product would need a small labelled corpus from diverse users and a periodic recalibration loop.",
    ],
    links: [
      { label: "GitHub repo", href: "https://github.com/TechV013" },
    ],
    accent: "marigold",
    visual: "cognitive",
  },
  {
    slug: "room-booking",
    name: "Student Room Booking Platform",
    tagline:
      "A full-stack marketplace for student accommodation — listings, bookings, payments, in production.",
    year: "2025",
    role: "Solo full-stack build",
    status: "shipped",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind",
      "Docker",
      "GitHub Actions",
    ],
    problem:
      "Off-campus housing for students in Indian college towns is a mess of WhatsApp groups, broker fees, and unverifiable listings. I wanted a focused, mobile-first marketplace where students can browse, book, and pay for verified rooms without the noise.",
    approach: [
      "Modelled the domain carefully in Prisma: Users, Listings, Bookings, Payments, Reviews, with the right cascade rules so a cancelled listing never leaves orphan bookings.",
      "Built a Next.js (App Router) front end with server components for the listing pages — listings render fast, even on a 3G hostel connection, and the URL is the source of truth.",
      "Implemented booking + payment as a state machine: pending → confirmed → checked-in → completed, with optimistic UI and idempotent webhook handlers so retries never double-charge.",
      "Containerised with Docker, set up a CI pipeline in GitHub Actions that runs typecheck + lint + tests on every PR, and ships to a container host on merge to main.",
    ],
    architecture: [
      { label: "Web", detail: "Next.js (App Router), RSC, Tailwind" },
      { label: "API", detail: "Route handlers + server actions" },
      { label: "ORM", detail: "Prisma, PostgreSQL" },
      { label: "Payments", detail: "Idempotent webhooks, state machine" },
      { label: "Auth", detail: "Email + OAuth, httpOnly cookies" },
      { label: "Deploy", detail: "Docker, GitHub Actions CI/CD" },
    ],
    decisions: [
      {
        title: "Server Components, not a SPA",
        body: "Listings are SEO-critical and most users arrive from Google. Rendering on the server means the page works without JS, loads fast on bad networks, and the data layer stays the source of truth.",
      },
      {
        title: "Prisma over a hand-rolled query layer",
        body: "The schema is the contract. Prisma's type-safe client means a typo in a relation is a compile error, not a 3am production incident.",
      },
      {
        title: "Booking as a state machine",
        body: "Status transitions are explicit and tested. Every payment webhook, every cancellation, every admin override goes through the same function — which means we can replay the audit log and know exactly what happened.",
      },
    ],
    reflections: [
      "I'd add a verified-student flow (college email domain check + ID upload) before allowing listings. Right now trust is reputational; it should be cryptographically grounded.",
      "Search is naive (LIKE on title). For the next iteration I'd add a real search layer (Postgres trigram or Meilisearch) and a 'rooms near me' geo query.",
    ],
    links: [
      { label: "GitHub repo", href: "https://github.com/TechV013" },
    ],
    accent: "clay",
    visual: "room",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
