'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { Showcase } from '@/components/landing/Showcase';
import { RichMediaSection } from '@/components/landing/RichMediaSection';
import { TechArchitecture } from '@/components/landing/TechArchitecture';
import { SecuritySection } from '@/components/landing/SecuritySection';
import { ComparisonSection } from '@/components/landing/ComparisonSection';
import { InteractiveDemo } from '@/components/landing/InteractiveDemo';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#88E788] selection:text-slate-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <Features />
        <Showcase />
        <RichMediaSection />
        <TechArchitecture />
        <SecuritySection />
        <ComparisonSection />
        <InteractiveDemo />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

