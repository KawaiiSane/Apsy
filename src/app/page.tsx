import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { MissionBand } from "@/components/landing/MissionBand";
import { ResearchVerticals } from "@/components/landing/ResearchVerticals";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { PlatformFeatures } from "@/components/landing/PlatformFeatures";
import { CtaSection } from "@/components/landing/CtaSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MissionBand />
        <ResearchVerticals />
        <CommunitySection />
        <PlatformFeatures />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
