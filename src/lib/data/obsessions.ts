export type Obsession = {
  id: string;
  category: string;
  title: string;
  status: string;
  detail: string;
  meta: string;
  color: string;
};

export const obsessions: Obsession[] = [
  {
    id: "music",
    category: "Music",
    title: "Old Hindi film scores, on loop",
    status: "Now playing — R.D. Burman · 'Dum Maro Dum'",
    detail:
      "I keep a queue of pre-2000 Hindi film scores and let them run while I work. Slow, melodic, and never competes for attention. I don't really listen to lyrics — I listen to arrangements.",
    meta: "BPM 92 · ♪ 4/4",
    color: "#D4A857",
  },
  {
    id: "sports",
    category: "Sports",
    title: "Cricket, the long formats",
    status: "Re-watching — 2005 Ashes, the Overton spell",
    detail:
      "I play on weekends and watch more than I should. Test matches over T20 — five days is the point. I've started tracking my own batting in a notebook, which is the kind of nerd move I won't apologise for.",
    meta: "Overs 450.2 · RR 3.14",
    color: "#5BB58A",
  },
  {
    id: "gaming",
    category: "Gaming",
    title: "Slow, weird single-player games",
    status: "Just finished — Outer Wilds. Crying, still.",
    detail:
      "I don't really play competitive games. I play things that make me think differently about systems — Outer Wilds, Disco Elysium, FTL. I keep a notes file of every trick a game teaches me about engineering.",
    meta: "Save 04 · 12h 41m",
    color: "#E07A8E",
  },
  {
    id: "travel",
    category: "Travel",
    title: "Slow trains across North India",
    status: "Next — 14h to Jaisalmer, winter desert run",
    detail:
      "I take the train everywhere I can. There's a stretch of the Jaipur–Jodhpur line at golden hour that I'd happily ride monthly. I keep a list of small stations with good chai.",
    meta: "26.85° N · 70.92° E",
    color: "#5A8DEE",
  },
  {
    id: "chai",
    category: "Ritual",
    title: "Masala chai, not espresso",
    status: "Cup 3 of chai, made from the steel filter",
    detail:
      "I do pour-over on weekends with a Hario V60, but most days it's masala chai from a steel filter. The ritual matters more than the caffeine. I have a small notebook where I rate each batch.",
    meta: "1:6 · whole milk",
    color: "#F0B860",
  },
  {
    id: "books",
    category: "Books",
    title: "Long-form, no self-help",
    status: "Reading — 'The Beginning of Infinity' · David Deutsch",
    detail:
      "I'm suspicious of books that promise to optimise me. I read long-form essays and science — Deutsch, Taleb, early internet writing from the 90s. I keep a public notes file of passages I want to come back to.",
    meta: "p. 142 / 487",
    color: "#A6843A",
  },
  {
    id: "code",
    category: "Code",
    title: "Systems that explain themselves",
    status: "Building — cognitive load, visible to the user",
    detail:
      "Lately I've been obsessed with software that tells you what it's doing while it's doing it. Visible state, honest error messages, dashboards a non-engineer can read. Less 'magic', more 'this is what's happening'.",
    meta: "v0.4 · WIP",
    color: "#E8C887",
  },
];

export const stack = {
  Languages: ["Java", "Python", "TypeScript", "JavaScript", "SQL"],
  Frontend: ["React", "Next.js", "HTML5", "CSS3", "Tailwind"],
  Backend: ["Node.js", "Express", "Spring Boot", "REST APIs"],
  "Cloud & DevOps": [
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "CI/CD",
    "AWS",
    "Azure",
  ],
  Databases: ["PostgreSQL", "MySQL", "Microsoft SQL Server"],
  "Testing & QA": ["Selenium", "Manual Testing", "Regression"],
  Tools: ["Git", "GitHub", "VS Code", "Linux"],
  Core: ["DSA", "OOP", "DBMS", "OS", "Computer Networks"],
};
