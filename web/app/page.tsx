import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Trust } from "@/components/sections/Trust";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Projects />
      {/* Testimonials are hidden until real quotes exist (PLAN.md Q1); see content/testimonials.ts */}
      <Trust />
    </>
  );
}
