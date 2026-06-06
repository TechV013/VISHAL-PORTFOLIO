"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function KatanaCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("katana-cursor-on");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("katana-cursor-on");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
      style={{ x, y, translateX: "-2px", translateY: "-2px" }}
    >
      <KatanaSVG />
    </motion.div>
  );
}

/**
 * Detailed pixel katana — 32×32 viewBox, 6 shades of gold, no glow filters.
 *
 * Layout (32×32 grid):
 *   - Blade: diagonal tip at top-right → meets tsuba at bottom-left
 *   - Edge highlight: cream pixels on the sharp edge
 *   - Fuller: dark-gold pixels down the middle of the blade
 *   - Tsuba: gold-deep block with cobalt accent
 *   - Seppa: thin gold-deep spacer
 *   - Tsuka: 3-row diamond wrap (gold + ink)
 *   - Menuki: cobalt dot on the hilt
 *   - Kashira: gold-deep pommel with bright center
 */
function KatanaSVG() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      style={{
        imageRendering: "pixelated",
        display: "block",
      }}
      aria-hidden
    >
      {/* ─── BLADE BODY (warm gold, 2px diagonal) ─── */}
      {[
        [28, 1, 2, 2],
        [26, 3, 2, 2],
        [24, 5, 2, 2],
        [22, 7, 2, 2],
        [20, 9, 2, 2],
        [18, 11, 2, 2],
        [16, 13, 2, 2],
        [14, 15, 2, 2],
        [12, 17, 2, 2],
        [10, 19, 2, 2],
        [8, 21, 2, 2],
        [6, 23, 2, 2],
        [4, 25, 2, 2],
      ].map(([x, y, w, h], i) => (
        <rect key={`body-${i}`} x={x} y={y} width={w} height={h} fill="#D4A857" />
      ))}

      {/* ─── EDGE HIGHLIGHT (cream, the sharp side) ─── */}
      {[
        [29, 0, 1, 1],
        [27, 2, 1, 1],
        [25, 4, 1, 1],
        [23, 6, 1, 1],
        [21, 8, 1, 1],
        [19, 10, 1, 1],
        [17, 12, 1, 1],
        [15, 14, 1, 1],
        [13, 16, 1, 1],
        [11, 18, 1, 1],
        [9, 20, 1, 1],
        [7, 22, 1, 1],
        [5, 24, 1, 1],
        [3, 26, 1, 1],
      ].map(([x, y, w, h], i) => (
        <rect
          key={`edge-${i}`}
          x={x}
          y={y}
          width={w}
          height={h}
          fill="#F4F1E8"
        />
      ))}

      {/* ─── TIP HIGHLIGHT (very tip is brighter) ─── */}
      <rect x="29" y="1" width="1" height="1" fill="#F4F1E8" />
      <rect x="28" y="2" width="1" height="1" fill="#E8C887" />

      {/* ─── FULLER (dark gold, the blood groove down the middle) ─── */}
      {[
        [27, 4, 1, 1],
        [25, 6, 1, 1],
        [23, 8, 1, 1],
        [21, 10, 1, 1],
        [19, 12, 1, 1],
        [17, 14, 1, 1],
        [15, 16, 1, 1],
        [13, 18, 1, 1],
        [11, 20, 1, 1],
        [9, 22, 1, 1],
        [7, 24, 1, 1],
      ].map(([x, y, w, h], i) => (
        <rect
          key={`fuller-${i}`}
          x={x}
          y={y}
          width={w}
          height={h}
          fill="#8B6A2C"
        />
      ))}

      {/* ─── HAMON LINE (temper line, a single bright pixel) ─── */}
      {[
        [26, 5, 1, 1],
        [24, 7, 1, 1],
        [22, 9, 1, 1],
        [20, 11, 1, 1],
        [18, 13, 1, 1],
        [16, 15, 1, 1],
        [14, 17, 1, 1],
        [12, 19, 1, 1],
        [10, 21, 1, 1],
        [8, 23, 1, 1],
      ].map(([x, y, w, h], i) => (
        <rect
          key={`hamon-${i}`}
          x={x}
          y={y}
          width={w}
          height={h}
          fill="#E8C887"
          opacity="0.6"
        />
      ))}

      {/* ─── TSUBA (guard) — 4×2 block ─── */}
      <rect x="2" y="26" width="4" height="1" fill="#8B6A2C" />
      <rect x="2" y="27" width="4" height="1" fill="#5A8DEE" />
      <rect x="3" y="26" width="2" height="1" fill="#D4A857" />

      {/* ─── SEPPA (thin spacer) ─── */}
      <rect x="2" y="28" width="4" height="1" fill="#8B6A2C" />

      {/* ─── TSUKA (hilt) — 3 rows of diamond wrap ─── */}
      <rect x="2" y="29" width="4" height="1" fill="#A6843A" />
      {/* row 2 - diamond wrap */}
      <rect x="2" y="30" width="1" height="1" fill="#0A1428" />
      <rect x="3" y="30" width="1" height="1" fill="#D4A857" />
      <rect x="4" y="30" width="1" height="1" fill="#0A1428" />
      <rect x="5" y="30" width="1" height="1" fill="#D4A857" />

      {/* ─── MENUKI (cobalt accent dot on hilt) ─── */}
      <rect x="3" y="29" width="1" height="1" fill="#5A8DEE" />

      {/* ─── KASHIRA (pommel) ─── */}
      <rect x="2" y="31" width="4" height="1" fill="#A6843A" />
      <rect x="3" y="31" width="2" height="1" fill="#E8C887" />
    </svg>
  );
}
