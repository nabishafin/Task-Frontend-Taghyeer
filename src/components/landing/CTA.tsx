'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-200 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#88E788]/10 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="flex justify-center">
          <Logo size="xl" variant="light" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Ready to experience{' '}
          <span className="text-[#2d8a2d]">
            Pulse
          </span>
          ?
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Start direct 1-to-1 messaging or build multi-member group chats with real-time Socket.io synchronization.
        </p>

        <div className="pt-3">
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2.5 text-sm font-extrabold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-8 py-4 rounded-2xl shadow-lg shadow-[#88E788]/30 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#2d8a2d]" />
            <span>Launch Chat Application</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
