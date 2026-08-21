'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, CheckCircle2, Sparkles, ShieldCheck, Activity, Globe, MessageSquare } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function Hero() {
  return (
    <div className="w-full max-w-full px-2 sm:px-3 md:px-4 lg:px-5 pt-16 sm:pt-20 pb-3 bg-slate-100/70">
      <section className="relative w-full max-w-full rounded-2xl pt-10 pb-8 md:pt-14 md:pb-10 px-3 sm:px-6 md:px-8 bg-white text-slate-900 overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-900/5 selection:bg-[#88E788] selection:text-slate-900">
        {/* 1st Premium Transparent High-Tech Background Waves Overlay */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-35 pointer-events-none mix-blend-multiply overflow-hidden rounded-2xl">
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

        <div className="relative z-10">

          {/* Header & Typography */}
          <div className="text-center max-w-2xl mx-auto space-y-3.5">

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
              Real-time conversations that keep your team{' '}
              <span className="bg-gradient-to-r from-[#2d8a2d] to-emerald-600 bg-clip-text text-transparent underline decoration-[#88E788]/60 underline-offset-4 font-bold">
                always connected.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
              VibeWire delivers instant 1-to-1 direct messaging, multi-member group channels, high-res photo sharing, and zero unsent draft loss powered by sub-10ms Socket.io stream.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-950 bg-[#88E788] hover:bg-[#73db73] px-6 py-2.5 rounded shadow-sm hover:shadow transition-all border border-[#7ae67a]"
              >
                <Sparkles className="w-4 h-4 text-[#2d8a2d]" />
                <span>Launch VibeWire Messenger</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-5 py-2.5 rounded transition-all"
              >
                <span>Quick 1-Click Demo Login</span>
              </Link>
            </div>

            {/* Minimal Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Socket.io Bidirectional
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Group Admin Roles
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Smart Auto-Scroll
              </span>
            </div>

          </div>

          {/* Minimal App Mockup Frame - Controlled Width Matching Navbar (max-w-6xl) */}
          <div className="mt-8 max-w-6xl mx-auto relative p-2.5 sm:p-4 md:p-5 rounded-2xl bg-slate-100/80 border border-slate-200/90 shadow-lg backdrop-blur-sm">

            {/* Main App Mockup Frame */}
            <div className="relative rounded-xl bg-slate-950 p-1.5 sm:p-2 border border-slate-800 shadow-xl overflow-hidden">
              {/* Top Browser Bar */}
              <div className="px-3 py-2 bg-slate-900 flex items-center justify-between border-b border-slate-800 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-3 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[10px] flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#88E788] animate-pulse" />
                  <span>vibewire.app / live-messenger</span>
                </div>
                <div className="w-10" />
              </div>

              {/* App Interface Mockup */}
              <div className="relative w-full min-h-[320px] sm:min-h-[400px] bg-slate-950 text-slate-100 flex font-sans">
                {/* Left Sidebar */}
                <div className="hidden md:flex flex-col w-56 bg-slate-900/90 border-r border-slate-800 p-3 space-y-3 shrink-0">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#88E788] text-slate-950 flex items-center justify-center font-bold text-xs">
                        V
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-white">VibeWire Workspace</h4>
                        <p className="text-[9px] text-slate-400 font-mono">Socket.io Stream</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest px-1">Conversations</span>

                    <div className="p-2 bg-[#88E788]/15 border-l-2 border-[#88E788] flex items-center gap-2">
                      <Avatar name="Alex Smith" seed="alex" size="sm" isOnline />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">Alex Smith</p>
                        <p className="text-[9px] text-[#88E788] truncate font-mono">Connected</p>
                      </div>
                    </div>

                    <div className="p-2 bg-transparent flex items-center gap-2 text-slate-400 hover:bg-slate-800/50">
                      <Avatar name="Engineering Group" seed="group1" size="sm" isGroup />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-300 truncate">Engineering Group</p>
                        <p className="text-[9px] text-slate-500 truncate font-mono">3 Members</p>
                      </div>
                    </div>

                    <div className="p-2 bg-transparent flex items-center gap-2 text-slate-400 hover:bg-slate-800/50">
                      <Avatar name="Sarah Jenkins" seed="sarah" size="sm" isOnline />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-300 truncate">Sarah Jenkins</p>
                        <p className="text-[9px] text-slate-500 truncate font-mono">Draft saved</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat View */}
                <div className="flex-1 flex flex-col justify-between bg-slate-950 p-3 sm:p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Avatar name="Alex Smith" seed="alex" size="sm" isOnline />
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-2">
                          <span>Alex Smith</span>
                          <span className="text-[8px] font-mono text-[#88E788] bg-[#88E788]/20 px-1 py-0.5 border border-[#88E788]/40">
                            DIRECT CHAT
                          </span>
                        </h4>
                        <p className="text-[9px] text-slate-400 font-mono">+1 555-0192 • Active</p>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      WebSocket Stream (4ms)
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="space-y-2.5 py-1 flex-1 justify-end flex flex-col font-sans">
                    <div className="flex items-start gap-2">
                      <Avatar name="Alex Smith" seed="alex" size="sm" />
                      <div className="bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-200 leading-relaxed max-w-[85%]">
                        Hey! I searched users via phone number and started a direct chat stream.
                        <span className="block text-[9px] text-slate-500 mt-1 font-mono">10:42 AM</span>
                      </div>
                    </div>

                    <div className="flex justify-center my-0.5">
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Socket.io Cache Synced • 0ms UI Re-render
                      </span>
                    </div>

                    <div className="flex items-end justify-end gap-2">
                      <div className="bg-[#88E788] text-slate-950 font-semibold p-2.5 text-xs leading-relaxed max-w-[85%]">
                        Great! Unsent drafts are persisted per chat in Redux memory state, and group rules require at least 3 total members.
                        <span className="block text-[9px] text-slate-900 opacity-75 mt-1 font-mono font-bold">10:43 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="pt-1 border-t border-slate-800">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 px-2">
                      <input
                        type="text"
                        readOnly
                        value="Type a message to start real-time chat..."
                        className="flex-1 bg-transparent text-xs text-slate-400 focus:outline-none"
                      />
                      <div className="p-1 bg-[#88E788] text-slate-950 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto text-center border-t border-slate-200 pt-6">
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">&lt; 10ms</p>
              <p className="text-[11px] font-medium text-slate-500">Socket.io Latency</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-bold text-[#2d8a2d] font-mono">100%</p>
              <p className="text-[11px] font-medium text-slate-500">Real-Time State Sync</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">3+ Members</p>
              <p className="text-[11px] font-medium text-slate-500">Group Chat Admin Rules</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-bold text-[#2d8a2d] font-mono">Draft Auto-Save</p>
              <p className="text-[11px] font-medium text-slate-500">Zero Unsent Message Loss</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
