import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { PillarsSection } from "@/components/sections/pillars";
import { SocialProofSection } from "@/components/sections/social-proof";
import { ProcessSection } from "@/components/sections/process";
import { DifferentialsSection } from "@/components/sections/differentials";
import { FAQSection } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <PillarsSection />
        <SocialProofSection />
        <ProcessSection />
        <DifferentialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
