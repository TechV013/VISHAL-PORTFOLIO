"use client";

import type { Project } from "@/lib/data/projects";

type ProjectVisualProps = {
  type: "cognitive" | "room";
  className?: string;
};

export function ProjectVisual({ type, className }: ProjectVisualProps) {
  if (type === "cognitive") return <CognitiveVisual className={className} />;
  return <RoomVisual className={className} />;
}

function CognitiveVisual({ className }: { className?: string }) {
  const points = [
    { x: 8, y: 56 },
    { x: 22, y: 38 },
    { x: 38, y: 52 },
    { x: 54, y: 28 },
    { x: 70, y: 48 },
    { x: 86, y: 22 },
    { x: 94, y: 18 },
  ];
  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="bg-cog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F1A33" />
            <stop offset="100%" stopColor="#16243F" />
          </linearGradient>
          <pattern
            id="grid-cog"
            x="0"
            y="0"
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 5 0 L 0 0 0 5"
              fill="none"
              stroke="#D4A857"
              strokeWidth="0.08"
              opacity="0.18"
            />
          </pattern>
          <linearGradient id="line-cog" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A6843A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E8C887" />
            <stop offset="100%" stopColor="#5A8DEE" />
          </linearGradient>
        </defs>
        <rect width="100" height="60" fill="url(#bg-cog)" />
        <rect width="100" height="60" fill="url(#grid-cog)" />

        {/* Bars (event intensity) */}
        {[6, 18, 30, 44, 56, 68, 80, 90].map((x, i) => {
          const h = [10, 16, 8, 22, 14, 28, 12, 20][i];
          return (
            <rect
              key={x}
              x={x}
              y={60 - h}
              width="2.4"
              height={h}
              fill={i % 2 === 0 ? "#D4A857" : "#5A8DEE"}
              opacity={0.65}
            />
          );
        })}

        {/* Trend line */}
        <path
          d={path}
          fill="none"
          stroke="url(#line-cog)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="1.4" fill="#0A1428" />
            <circle cx={p.x} cy={p.y} r="0.9" fill="#E8C887" />
          </g>
        ))}

        {/* Labels */}
        <g fontFamily="'JetBrains Mono', monospace" fontSize="2.4" fill="#D4A857">
          <text x="4" y="6" letterSpacing="0.5">
            $ stress --window 60s
          </text>
          <text x="4" y="56" fill="#5A8DEE">
            PREDICT: 0.82 · TREND ↑
          </text>
          <text x="60" y="56" fill="#E07A8E">
            CONF: 0.74
          </text>
        </g>
      </svg>
    </div>
  );
}

function RoomVisual({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="bg-room" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F1A33" />
            <stop offset="100%" stopColor="#16243F" />
          </linearGradient>
        </defs>
        <rect width="100" height="60" fill="url(#bg-room)" />

        {/* Listing card */}
        <rect
          x="48"
          y="14"
          width="44"
          height="20"
          fill="none"
          stroke="#D4A857"
          strokeWidth="0.4"
        />
        <rect x="48" y="14" width="44" height="5" fill="#D4A857" opacity="0.7" />
        <text
          x="50"
          y="17.5"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="1.8"
          fill="#0A1428"
        >
          ROOM B-204 · 1BR
        </text>
        <rect x="50" y="22" width="40" height="1.5" fill="#FFFFFF" opacity="0.2" />
        <rect x="50" y="25" width="22" height="1.2" fill="#5A8DEE" opacity="0.7" />
        <rect x="50" y="28" width="32" height="1.2" fill="#FFFFFF" opacity="0.15" />

        {/* Mini map / pin */}
        <g transform="translate(8 12)">
          <rect width="32" height="24" fill="none" stroke="#5A8DEE" strokeWidth="0.3" opacity="0.4" />
          <path
            d="M 16 18 L 16 8"
            stroke="#5A8DEE"
            strokeWidth="0.4"
          />
          <circle cx="16" cy="6" r="2" fill="none" stroke="#D4A857" strokeWidth="0.4" />
          <circle cx="16" cy="6" r="0.8" fill="#D4A857" />
        </g>

        {/* Status pill */}
        <rect
          x="48"
          y="40"
          width="14"
          height="3"
          fill="#5BB58A"
          opacity="0.85"
        />
        <text
          x="49"
          y="42.3"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="1.6"
          fill="#0A1428"
        >
          BOOKED
        </text>

        {/* Floor rule */}
        <line
          x1="0"
          y1="56"
          x2="100"
          y2="56"
          stroke="#D4A857"
          strokeWidth="0.3"
          opacity="0.4"
        />

        {/* Labels */}
        <g fontFamily="'JetBrains Mono', monospace" fontSize="2">
          <text x="48" y="48" fill="#D4A857">
            jaipur · ₹12.5k/mo
          </text>
          <text x="48" y="53" fill="#A8B5CC">
            verified · photos 4/6
          </text>
        </g>
      </svg>
    </div>
  );
}

// Re-export type for the page that uses it
export type { Project };
