import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Obsessions } from "@/components/sections/obsessions";
import { Stack } from "@/components/sections/stack";
import { Now } from "@/components/sections/now";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Work />
      <Experience />
      <Obsessions />
      <Stack />
      <Now />
    </main>
  );
}
