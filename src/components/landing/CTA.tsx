'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-12 md:py-16 bg-white text-slate-900 border-b border-slate-200/80 text-center relative overflow-hidden">
      {/* Glow radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#88E788]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="flex justify-center">
          <Logo size="xl" variant="light" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
          Ready to experience real-time chat with{' '}
          <span className="bg-gradient-to-r from-[#2d8a2d] to-emerald-600 bg-clip-text text-transparent underline decoration-[#88E788]/60 underline-offset-4">
            VibeWire?
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-normal">
          Join users enjoying instant Socket.io WebSocket connections, smart draft preservation, and multi-member group management.
        </p>

        <div className="pt-4">
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2.5 text-sm font-bold text-slate-950 bg-[#88E788] hover:bg-[#73db73] px-7 py-3.5 rounded shadow-sm hover:shadow transition-all border border-[#7ae67a]"
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

