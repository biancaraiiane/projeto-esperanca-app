
import { LandingHero } from "@/components/LandingHero";
import { PartnersSection } from "@/components/PartnersSection";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { QuemSomos } from "@/components/QuemSomos";
import { TransparencySection } from "@/components/TransparencySection";

import { projects } from "@/data/projects";


export default function Home() {
  return (
    <main className="min-h-screen bg-(--bg-main)">
      <LandingHero/>
      <QuemSomos />
      <ProjectsCarousel projects={projects}/>
      <PartnersSection />
      <TransparencySection />
    </main>
  );
}