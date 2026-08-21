'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Showcase } from '@/components/landing/Showcase';
import { InteractiveDemo } from '@/components/landing/InteractiveDemo';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <InteractiveDemo />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
