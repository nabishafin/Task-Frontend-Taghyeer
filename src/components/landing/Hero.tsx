'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, CheckCircle2, Sparkles, ShieldCheck, Activity, Globe, MessageSquare } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80 selection:bg-[#88E788] selection:text-slate-900">
      {/* Transparent Abstract Tech Waves Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply overflow-hidden">
        <Image
          src="/images/hero_transparent_bg.jpg"
          alt="Transparent High-Tech Background Waves"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Background ambient lighting & mesh glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#88E788]/20 rounded-full blur-[150px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-[#88E788]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Header & Robotic Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#88E788] text-slate-900 text-xs font-mono font-bold shadow-md shadow-[#88E788]/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#2d8a2d] animate-ping shrink-0" />
            <span className="text-[#2d8a2d] tracking-wider uppercase text-[10px]">Real-Time Socket.io Messenger</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-semibold">Sub-10ms Latency</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Conversations that{' '}
            <span className="bg-gradient-to-r from-[#2d8a2d] via-emerald-600 to-[#2d8a2d] bg-clip-text text-transparent underline decoration-[#88E788] underline-offset-8">
              never miss a moment.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Pulse delivers instant 1-to-1 direct messaging and multi-member team group chats powered by Socket.io, smart auto-scroll, RTK Query cache streaming, and automatic draft preservation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-7 py-3.5 rounded-xl shadow-lg shadow-[#88E788]/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#2d8a2d]" />
              <span>Launch Chat Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-6 py-3.5 rounded-xl transition-all shadow-2xs"
            >
              <span>Quick 1-Click Demo Login</span>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-slate-600 font-bold">
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Socket.io Bidirectional
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Group Admin Roles
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d8a2d]" /> Smart Auto-Scroll
            </span>
          </div>

        </div>

        {/* Hero Visual Mockup Container with Floating Cards */}
        <div className="mt-14 max-w-6xl mx-auto relative">
          
          {/* Floating Widget Top-Left */}
          <div className="hidden md:flex absolute -top-6 -left-6 z-20 items-center gap-3 bg-white/95 backdrop-blur-2xl border border-slate-200 p-3 px-4 rounded-2xl shadow-2xl animate-bounce duration-1000">
            <div className="w-9 h-9 rounded-xl bg-[#88E788] text-slate-900 flex items-center justify-center font-extrabold shadow-sm">
              <Zap className="w-5 h-5 text-[#2d8a2d]" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Real-Time Sync Active</p>
              <p className="text-[10px] text-[#2d8a2d] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d8a2d] animate-pulse" />
                Socket.io Live Stream
              </p>
            </div>
          </div>

          {/* Floating Widget Bottom-Right */}
          <div className="hidden md:flex absolute -bottom-6 -right-6 z-20 items-center gap-3 bg-white/95 backdrop-blur-2xl border border-slate-200 p-3 px-4 rounded-2xl shadow-2xl">
            <div className="w-9 h-9 rounded-xl bg-[#88E788]/30 border border-[#88E788] text-[#2d8a2d] flex items-center justify-center font-extrabold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">100% Unsent Draft Saved</p>
              <p className="text-[10px] text-slate-500 font-medium">Auto-persisted in Redux memory</p>
            </div>
          </div>

          {/* Main App Frame */}
          <div className="relative rounded-3xl bg-slate-950 p-2 sm:p-3 shadow-2xl shadow-slate-900/30 border border-slate-800">
            {/* Top Browser Address Bar */}
            <div className="px-5 py-2.5 bg-slate-900 rounded-t-2xl flex items-center justify-between border-b border-slate-800 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="px-4 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#88E788] animate-pulse" />
                <span>pulse-chat.app / live-socket-stream</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Code-Rendered Professional Enterprise SaaS App Interface */}
            <div className="relative w-full min-h-[380px] sm:min-h-[480px] lg:min-h-[520px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 text-slate-100 flex font-sans">
              {/* Left Sidebar Mockup */}
              <div className="hidden md:flex flex-col w-64 bg-slate-900/90 border-r border-slate-800/80 p-4 space-y-4 shrink-0">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#88E788] text-slate-900 flex items-center justify-center font-black text-xs">
                      P
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Acme Corp Workspace</h4>
                      <p className="text-[10px] text-slate-400">Engineering Team</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Conversations</span>
                  
                  <div className="p-2.5 rounded-xl bg-[#88E788]/20 border border-[#88E788]/50 flex items-center gap-2.5">
                    <Avatar name="Alan Turing" seed="alan" size="sm" isOnline />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">Alan Turing</p>
                      <p className="text-[10px] text-[#88E788] truncate font-medium">Socket handler synced</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-transparent hover:bg-slate-800/50 flex items-center gap-2.5 text-slate-400">
                    <Avatar name="Pioneers Core" seed="pioneers" size="sm" isGroup />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-300 truncate">Pioneers Team</p>
                      <p className="text-[10px] text-slate-500 truncate">Grace: Sprint 4 kickoff</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-transparent hover:bg-slate-800/50 flex items-center gap-2.5 text-slate-400">
                    <Avatar name="Ada Lovelace" seed="ada" size="sm" isOnline />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-300 truncate">Ada Lovelace</p>
                      <p className="text-[10px] text-slate-500 truncate">Draft recovery active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Chat Content Panel */}
              <div className="flex-1 flex flex-col justify-between bg-slate-950 p-4 sm:p-6 space-y-4">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <Avatar name="Alan Turing" seed="alan" size="md" isOnline />
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                        <span>Alan Turing</span>
                        <span className="text-[9px] font-mono font-bold bg-[#88E788]/20 text-[#88E788] px-2 py-0.5 rounded-md border border-[#88E788]/40">
                          DIRECT CHAT
                        </span>
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400">Senior Systems Architect • Active now</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      WebSocket Connected (4ms)
                    </span>
                  </div>
                </div>

                {/* Message Stream */}
                <div className="space-y-4 py-2 flex-1 justify-end flex flex-col font-sans">
                  {/* Incoming Msg 1 */}
                  <div className="flex items-start gap-3">
                    <Avatar name="Alan Turing" seed="alan" size="sm" />
                    <div className="space-y-1 max-w-[85%] sm:max-w-[75%]">
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-xs text-xs text-slate-200 leading-relaxed shadow-sm">
                        Hey Ada! I just deployed the updated Socket.io real-time listener handlers to our production cluster.
                        <span className="block text-[9px] text-slate-500 mt-1 font-mono">10:42 AM • Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* System Log Badge */}
                  <div className="flex justify-center my-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Socket.io Cache Stream Synced • 0ms UI Re-render
                    </span>
                  </div>

                  {/* Outgoing Msg 2 */}
                  <div className="flex items-end justify-end gap-3">
                    <div className="space-y-1 max-w-[85%] sm:max-w-[75%] text-right">
                      <div className="bg-[#88E788] text-slate-950 font-semibold p-3 rounded-2xl rounded-br-xs text-xs leading-relaxed shadow-md shadow-[#88E788]/20">
                        Excellent! RTK Query cache invalidation is streaming incoming messages in real-time. Unsent drafts are persisted automatically.
                        <span className="block text-[9px] text-slate-900 opacity-75 mt-1 font-mono font-bold">10:43 AM • Sent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input Composer */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 px-3">
                    <input
                      type="text"
                      readOnly
                      value="Type a message to start real-time chat..."
                      className="flex-1 bg-transparent text-xs text-slate-400 focus:outline-none"
                    />
                    <div className="p-2 rounded-lg bg-[#88E788] text-slate-900 font-bold shadow-sm">
                      <Sparkles className="w-4 h-4 text-[#2d8a2d]" />
                    </div>
                  </div>
                </div>
              </div>
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

