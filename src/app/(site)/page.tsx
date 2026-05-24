
import { LandingHero } from "@/components/LandingHero";
import { QuemSomos } from "@/components/QuemSomos";
import { TransparencySection } from "@/components/TransparencySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--bg-main)">
      <LandingHero/>
      <QuemSomos />
      <TransparencySection />
    </main>
  );
}