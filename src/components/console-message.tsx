"use client";

import { useEffect } from "react";

export function ConsoleMessage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const styles = [
      "background: #0A1428",
      "color: #D4A857",
      "padding: 14px 18px",
      "border: 1px solid #D4A857",
      "font-family: 'JetBrains Mono', monospace",
      "font-size: 12px",
      "line-height: 1.6",
    ].join(";");
    const cobaltStyle = ["color: #5A8DEE", "font-weight: bold"].join(";");
    const goldStyle = ["color: #E8C887", "font-weight: bold"].join(";");
    const roseStyle = ["color: #E07A8E", "font-weight: bold"].join(";");

    // eslint-disable-next-line no-console
    console.log(
      "%c┌─[ vishal@portfolio ]─[ ~ ]\n│\n│  ✦ final-year CS @ amity, jaipur\n│  ✦ ships full-stack · cloud · ML\n│  ✦ currently into: travel, cricket, slow games, R.D. burman\n│\n│  $ whoami\n│  → vishal jangir · he/him · 26.91°N 75.78°E\n│  $ cat ./now.txt\n│  → building systems that explain themselves\n│\n│  tip: try the konami code ↑↑↓↓←→←→BA\n│\n└─$ _",
      styles,
    );
    // eslint-disable-next-line no-console
    console.log(
      "%c→ vishalkheri013@gmail.com",
      goldStyle,
    );
    // eslint-disable-next-line no-console
    console.log(
      "%c→ github.com/TechV013",
      cobaltStyle,
    );
    // eslint-disable-next-line no-console
    console.log(
      "%c→ vishaljangir.vercel.app",
      roseStyle,
    );
  }, []);

  return null;
}
