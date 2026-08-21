'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, CheckCircle2, Sparkles, ShieldCheck, MessageSquare, Activity } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80">
      {/* Background ambient lighting & radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#88E788]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[#88E788]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Header & Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#88E788] text-slate-900 text-xs font-bold shadow-md shadow-[#88E788]/20 backdrop-blur-md animate-in fade-in duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2d8a2d] animate-ping shrink-0" />
            <span className="text-[#2d8a2d]">Real-Time Socket.io Messenger</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-semibold">Production Ready</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
            Conversations that{' '}
            <span className="text-[#2d8a2d] underline decoration-[#88E788] underline-offset-8">
              never miss a moment.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Pulse delivers instant 1-to-1 direct messaging and multi-member team group chats powered by Socket.io, smart auto-scroll, RTK Query cache streaming, and automatic draft preservation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-base font-extrabold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-8 py-4.5 rounded-2xl shadow-xl shadow-[#88E788]/35 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-[#2d8a2d]" />
              <span>Launch Chat Application</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-7 py-4.5 rounded-2xl transition-all shadow-2xs"
            >
              <span>Quick 1-Click Demo Login</span>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-bold">
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Socket.io Bidirectional
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Group Admin Roles
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Smart Auto-Scroll
            </span>
          </div>

        </div>

        {/* Hero Visual Mockup Container with Floating Cards */}
        <div className="mt-14 max-w-6xl mx-auto relative">
          
          {/* Floating Widget Top-Left */}
          <div className="hidden md:flex absolute -top-6 -left-6 z-20 items-center gap-3 bg-white/90 backdrop-blur-xl border border-slate-200/80 p-3 px-4 rounded-2xl shadow-xl animate-bounce duration-1000">
            <div className="w-8 h-8 rounded-xl bg-[#88E788] text-slate-900 flex items-center justify-center font-bold shadow-2xs">
              <Zap className="w-4.5 h-4.5 text-[#2d8a2d]" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Real-Time Sync Active</p>
              <p className="text-[10px] text-[#2d8a2d] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d8a2d] animate-pulse" />
                Latency &lt; 10ms
              </p>
            </div>
          </div>

          {/* Floating Widget Bottom-Right */}
          <div className="hidden md:flex absolute -bottom-6 -right-6 z-20 items-center gap-3 bg-white/90 backdrop-blur-xl border border-slate-200/80 p-3 px-4 rounded-2xl shadow-xl">
            <div className="w-8 h-8 rounded-xl bg-[#88E788]/30 border border-[#88E788] text-[#2d8a2d] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">100% Draft Saved</p>
              <p className="text-[10px] text-slate-500 font-medium">Automatic memory state sync</p>
            </div>
          </div>

          {/* Main App Frame */}
          <div className="relative rounded-2xl bg-slate-900 p-2 sm:p-2.5 shadow-2xl shadow-slate-900/25 border border-slate-800">
            {/* Top Browser Bar */}
            <div className="px-4 py-2 bg-slate-900 rounded-t-xl flex items-center justify-between border-b border-slate-800 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="px-4 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px] flex items-center gap-2">
                <Activity className="w-3 h-3 text-[#88E788]" />
                <span>pulse-chat.app / live-messenger</span>
              </div>
              <div className="w-12" />
            </div>

            {/* App Mockup Graphic */}
            <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[540px] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image
                src="/images/hero_mockup.jpg"
                alt="Pulse Chat Interface Real-Time UI"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center border-t border-slate-200/80 pt-10">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">&lt; 10ms</p>
            <p className="text-xs font-semibold text-slate-500">Socket.io Latency</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-[#2d8a2d]">100%</p>
            <p className="text-xs font-semibold text-slate-500">Real-Time State Sync</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">3+ Members</p>
            <p className="text-xs font-semibold text-slate-500">Group Chat Admin Rules</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-[#2d8a2d]">Draft Auto-Save</p>
            <p className="text-xs font-semibold text-slate-500">Zero Unsent Message Loss</p>
          </div>
        </div>

      </div>
    </section>
  );
}
