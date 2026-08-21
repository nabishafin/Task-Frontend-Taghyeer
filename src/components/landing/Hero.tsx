'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, CheckCircle2, Sparkles, ShieldCheck, Activity, Globe, MessageSquare } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function Hero() {
  return (
    <section className="relative w-full max-w-full pt-16 pb-12 md:pt-20 md:pb-12 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80 selection:bg-[#88E788] selection:text-slate-900">
      {/* 1st Premium Transparent High-Tech Background Waves Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-35 pointer-events-none mix-blend-multiply overflow-hidden">
        <Image
          src="/images/hero_transparent_bg.jpg"
          alt="Transparent High-Tech Background Waves"
          fill
          className="object-cover object-center w-full h-full"
          priority
        />
      </div>

      {/* Crisp glowing accent ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#88E788]/20 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-emerald-400/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Header & Compact Headline */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          
          {/* Main Headline with High-Contrast Sharp Text */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Real-time conversations that keep your team{' '}
            <span className="bg-gradient-to-r from-[#2d8a2d] to-emerald-600 bg-clip-text text-transparent underline decoration-[#88E788] underline-offset-6">
              always connected.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            VibeWire delivers instant 1-to-1 direct messaging, multi-member group channels, high-res photo sharing, and zero unsent draft loss powered by sub-10ms Socket.io stream.
          </p>

          {/* Glossy Ultra-Attractive CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-[#88E788] via-[#7ae67a] to-[#88E788] hover:from-[#7ee47e] hover:to-[#88E788] px-6 py-3 rounded-lg shadow-lg shadow-[#88E788]/40 hover:shadow-xl hover:shadow-[#88E788]/60 transition-all hover:scale-105 active:scale-95 border border-[#88E788]"
            >
              <Sparkles className="w-4 h-4 text-[#2d8a2d]" />
              <span>Launch VibeWire Messenger</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-700 bg-white/90 hover:bg-white border border-slate-200/90 px-5 py-3 rounded-lg transition-all shadow-md backdrop-blur-md hover:scale-102"
            >
              <span>Quick 1-Click Demo Login</span>
            </Link>
          </div>

          {/* Glossy Value Badges */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-slate-700 font-bold">
            <span className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Socket.io Bidirectional
            </span>
            <span className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Group Admin Roles
            </span>
            <span className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Smart Auto-Scroll
            </span>
          </div>

        </div>

        {/* Hero Visual Mockup Container with Floating Glossy Glass Cards */}
        <div className="mt-7 max-w-6xl mx-auto relative">
          
          {/* Floating Glass Widget Top-Left */}
          <div className="hidden md:flex absolute -top-5 -left-5 z-20 items-center gap-3 bg-white/95 backdrop-blur-2xl border border-[#88E788]/80 p-3 px-4 rounded-xl shadow-2xl shadow-[#88E788]/20 animate-bounce duration-1000">
            <div className="w-8 h-8 rounded-lg bg-[#88E788] text-slate-900 flex items-center justify-center font-extrabold shadow-md">
              <Zap className="w-4 h-4 text-[#2d8a2d]" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">Real-Time Sync Active</p>
              <p className="text-[10px] text-[#2d8a2d] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d8a2d] animate-pulse" />
                Socket.io Live Stream
              </p>
            </div>
          </div>

          {/* Floating Glass Widget Bottom-Right */}
          <div className="hidden md:flex absolute -bottom-5 -right-5 z-20 items-center gap-3 bg-white/95 backdrop-blur-2xl border border-[#88E788]/80 p-3 px-4 rounded-xl shadow-2xl shadow-[#88E788]/20">
            <div className="w-8 h-8 rounded-lg bg-[#88E788]/30 border border-[#88E788] text-[#2d8a2d] flex items-center justify-center font-extrabold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">100% Unsent Draft Saved</p>
              <p className="text-[10px] text-slate-500 font-medium">Auto-persisted in Redux memory</p>
            </div>
          </div>

          {/* Main Glossy Dark Glass App Frame */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 p-2 sm:p-3 shadow-2xl shadow-[#88E788]/15 border border-slate-700/60 backdrop-blur-2xl overflow-hidden">
            {/* Top Glossy Reflective Sheen Highlight Line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#88E788]/80 to-transparent" />
            {/* Top Browser Address Bar */}
            <div className="px-4 py-2 bg-slate-900 rounded-t-lg flex items-center justify-between border-b border-slate-800 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[10px] flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#88E788] animate-pulse" />
                <span>vibewire.app / live-messenger</span>
              </div>
              <div className="w-10" />
            </div>

            {/* Code-Rendered Professional Enterprise SaaS App Interface */}
            <div className="relative w-full min-h-[320px] sm:min-h-[420px] lg:min-h-[460px] rounded-lg overflow-hidden bg-slate-950 border border-slate-800 text-slate-100 flex font-sans">
              {/* Left Sidebar Mockup */}
              <div className="hidden md:flex flex-col w-60 bg-slate-900/90 border-r border-slate-800/80 p-3 space-y-3 shrink-0">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[#88E788] text-slate-900 flex items-center justify-center font-black text-xs">
                      V
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white">VibeWire Workspace</h4>
                      <p className="text-[9px] text-slate-400">Live Production Server</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-1.5">Conversations</span>
                  
                  <div className="p-2 rounded-lg bg-[#88E788]/20 border border-[#88E788]/50 flex items-center gap-2">
                    <Avatar name="Alex Smith" seed="alex" size="sm" isOnline />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">Alex Smith</p>
                      <p className="text-[9px] text-[#88E788] truncate font-medium">Socket.io Connected</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-transparent hover:bg-slate-800/50 flex items-center gap-2 text-slate-400">
                    <Avatar name="Engineering Group" seed="group1" size="sm" isGroup />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-300 truncate">Engineering Group</p>
                      <p className="text-[9px] text-slate-500 truncate">3 Members • Admin Mode</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-transparent hover:bg-slate-800/50 flex items-center gap-2 text-slate-400">
                    <Avatar name="Sarah Jenkins" seed="sarah" size="sm" isOnline />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-300 truncate">Sarah Jenkins</p>
                      <p className="text-[9px] text-slate-500 truncate">Draft state saved</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Chat Content Panel */}
              <div className="flex-1 flex flex-col justify-between bg-slate-950 p-3 sm:p-5 space-y-3">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <Avatar name="Alex Smith" seed="alex" size="sm" isOnline />
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Alex Smith</span>
                        <span className="text-[8px] font-mono font-bold bg-[#88E788]/20 text-[#88E788] px-1.5 py-0.5 rounded border border-[#88E788]/40">
                          DIRECT CHAT
                        </span>
                      </h4>
                      <p className="text-[9px] text-slate-400">+1 555-0192 • Active now</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[9px] font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      WebSocket Connected (4ms)
                    </span>
                  </div>
                </div>

                {/* Message Stream */}
                <div className="space-y-3 py-1 flex-1 justify-end flex flex-col font-sans">
                  {/* Incoming Msg 1 */}
                  <div className="flex items-start gap-2.5">
                    <Avatar name="Alex Smith" seed="alex" size="sm" />
                    <div className="space-y-1 max-w-[85%] sm:max-w-[75%]">
                      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs text-slate-200 leading-relaxed shadow-sm">
                        Hey! I searched users via phone number and started a direct chat stream.
                        <span className="block text-[9px] text-slate-500 mt-1 font-mono">10:42 AM • Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* System Log Badge */}
                  <div className="flex justify-center my-0.5">
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Socket.io Cache Stream Synced • 0ms UI Re-render
                    </span>
                  </div>

                  {/* Outgoing Msg 2 */}
                  <div className="flex items-end justify-end gap-2.5">
                    <div className="space-y-1 max-w-[85%] sm:max-w-[75%] text-right">
                      <div className="bg-[#88E788] text-slate-950 font-semibold p-2.5 rounded-lg text-xs leading-relaxed shadow-sm shadow-[#88E788]/20">
                        Great! Unsent drafts are persisted per chat in Redux memory state, and group rules require at least 3 total members.
                        <span className="block text-[9px] text-slate-900 opacity-75 mt-1 font-mono font-bold">10:43 AM • Sent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input Composer */}
                <div className="pt-1.5 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1.5 px-2.5">
                    <input
                      type="text"
                      readOnly
                      value="Type a message to start real-time chat..."
                      className="flex-1 bg-transparent text-xs text-slate-400 focus:outline-none"
                    />
                    <div className="p-1.5 rounded bg-[#88E788] text-slate-900 font-bold shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto text-center border-t border-slate-200/80 pt-6">
          <div className="space-y-0.5">
            <p className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">&lt; 10ms</p>
            <p className="text-[11px] font-semibold text-slate-500">Socket.io Latency</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xl sm:text-2xl font-bold text-[#2d8a2d] font-mono">100%</p>
            <p className="text-[11px] font-semibold text-slate-500">Real-Time State Sync</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">3+ Members</p>
            <p className="text-[11px] font-semibold text-slate-500">Group Chat Admin Rules</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xl sm:text-2xl font-bold text-[#2d8a2d] font-mono">Draft Auto-Save</p>
            <p className="text-[11px] font-semibold text-slate-500">Zero Unsent Message Loss</p>
          </div>
        </div>

      </div>
    </section>
  );
}

