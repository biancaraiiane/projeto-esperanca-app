
import { LandingHero } from "@/components/LandingHero";
import { QuemSomos } from "@/components/QuemSomos";
import { TransparencySection } from "@/components/TransparencySection";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--bg-main)">
      <LandingHero/>
      <QuemSomos />
      <ProjectsCarousel projects={projects}/>
      <TransparencySection />
    </main>
  );
}