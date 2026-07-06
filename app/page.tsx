import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { PillarsSection } from "@/components/sections/pillars";
import { SocialProofSection } from "@/components/sections/social-proof";
import { ProcessSection } from "@/components/sections/process";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SocialProofSection />
        <ProcessSection />
        <PillarsSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
