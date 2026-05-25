
import { LandingHero } from "@/components/LandingHero";
import { QuemSomos } from "@/components/QuemSomos";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--bg-main)">
      <LandingHero/>
      <QuemSomos />
    </main>
  );
}