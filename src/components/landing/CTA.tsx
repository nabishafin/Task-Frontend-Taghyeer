'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-200/80 text-center relative overflow-hidden">
      {/* Glow radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#88E788]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="flex justify-center">
          <Logo size="xl" variant="light" />
        </div>

        <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Ready to experience{' '}
          <span className="text-[#2d8a2d] underline decoration-[#88E788] underline-offset-8">
            Pulse
          </span>
          ?
        </h2>

        <p className="text-xs sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed font-normal">
          Start direct 1-to-1 messaging or build multi-member group chats with real-time Socket.io synchronization.
        </p>

        <div className="pt-4">
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-3 text-base font-extrabold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-9 py-4.5 rounded-2xl shadow-xl shadow-[#88E788]/40 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-[#2d8a2d]" />
            <span>Launch Chat Application</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

