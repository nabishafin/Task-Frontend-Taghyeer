'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, CheckCircle2, Sparkles, ShieldCheck, Activity, Globe, MessageSquare } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function Hero() {
  return (
    <section className="relative pt-16 pb-12 md:pt-20 md:pb-12 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80 selection:bg-[#88E788] selection:text-slate-900">
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#88E788]/20 rounded-full blur-[140px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#88E788]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Header & Compact Headline */}
        <div className="text-center max-w-2xl mx-auto space-y-3.5">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#88E788] text-slate-900 text-xs font-mono font-bold shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#2d8a2d] animate-ping shrink-0" />
            <span className="text-[#2d8a2d] tracking-wider uppercase text-[10px]">Real-Time Socket.io Messenger</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-semibold text-[10px]">Sub-10ms Latency</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            Conversations that{' '}
            <span className="bg-gradient-to-r from-[#2d8a2d] via-emerald-600 to-[#2d8a2d] bg-clip-text text-transparent underline decoration-[#88E788]/60 underline-offset-4">
              never miss a moment.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-normal">
            Pulse delivers instant 1-to-1 direct messaging and multi-member team group chats powered by Socket.io, smart auto-scroll, RTK Query cache streaming, and automatic draft preservation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-5 py-2.5 rounded-lg shadow-md shadow-[#88E788]/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#2d8a2d]" />
              <span>Launch Chat Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-lg transition-all shadow-2xs"
            >
              <span>Quick 1-Click Demo Login</span>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-slate-600 font-bold">
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-[#2d8a2d]" /> Socket.io Bidirectional
            </span>
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-[#2d8a2d]" /> Group Admin Roles
            </span>
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-[#2d8a2d]" /> Smart Auto-Scroll
            </span>
          </div>

        </div>

        {/* Hero Visual Mockup Container with Floating Cards */}
        <div className="mt-6 max-w-6xl mx-auto relative">
          
          {/* Floating Widget Top-Left */}
          <div className="hidden md:flex absolute -top-4 -left-4 z-20 items-center gap-2.5 bg-white/95 backdrop-blur-2xl border border-slate-200 p-2.5 px-3 rounded-lg shadow-xl animate-bounce duration-1000">
            <div className="w-7 h-7 rounded-md bg-[#88E788] text-slate-900 flex items-center justify-center font-extrabold shadow-sm">
              <Zap className="w-4 h-4 text-[#2d8a2d]" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-900">Real-Time Sync Active</p>
              <p className="text-[9px] text-[#2d8a2d] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d8a2d] animate-pulse" />
                Socket.io Live Stream
              </p>
            </div>
          </div>

          {/* Floating Widget Bottom-Right */}
          <div className="hidden md:flex absolute -bottom-4 -right-4 z-20 items-center gap-2.5 bg-white/95 backdrop-blur-2xl border border-slate-200 p-2.5 px-3 rounded-lg shadow-xl">
            <div className="w-7 h-7 rounded-md bg-[#88E788]/30 border border-[#88E788] text-[#2d8a2d] flex items-center justify-center font-extrabold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-900">100% Unsent Draft Saved</p>
              <p className="text-[9px] text-slate-500 font-medium">Auto-persisted in Redux memory</p>
            </div>
          </div>

          {/* Main App Frame */}
          <div className="relative rounded-xl bg-slate-950 p-2 shadow-xl shadow-slate-900/30 border border-slate-800">
            {/* Top Browser Address Bar */}
            <div className="px-4 py-2 bg-slate-900 rounded-t-lg flex items-center justify-between border-b border-slate-800 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[10px] flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#88E788] animate-pulse" />
                <span>pulse-chat.app / live-socket-stream</span>
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
                      P
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white">Acme Corp Workspace</h4>
                      <p className="text-[9px] text-slate-400">Engineering Team</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-1.5">Conversations</span>
                  
                  <div className="p-2 rounded-lg bg-[#88E788]/20 border border-[#88E788]/50 flex items-center gap-2">
                    <Avatar name="Alan Turing" seed="alan" size="sm" isOnline />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">Alan Turing</p>
                      <p className="text-[9px] text-[#88E788] truncate font-medium">Socket handler synced</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-transparent hover:bg-slate-800/50 flex items-center gap-2 text-slate-400">
                    <Avatar name="Pioneers Core" seed="pioneers" size="sm" isGroup />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-300 truncate">Pioneers Team</p>
                      <p className="text-[9px] text-slate-500 truncate">Grace: Sprint 4 kickoff</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-transparent hover:bg-slate-800/50 flex items-center gap-2 text-slate-400">
                    <Avatar name="Ada Lovelace" seed="ada" size="sm" isOnline />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-300 truncate">Ada Lovelace</p>
                      <p className="text-[9px] text-slate-500 truncate">Draft recovery active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Chat Content Panel */}
              <div className="flex-1 flex flex-col justify-between bg-slate-950 p-3 sm:p-5 space-y-3">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <Avatar name="Alan Turing" seed="alan" size="sm" isOnline />
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Alan Turing</span>
                        <span className="text-[8px] font-mono font-bold bg-[#88E788]/20 text-[#88E788] px-1.5 py-0.5 rounded border border-[#88E788]/40">
                          DIRECT CHAT
                        </span>
                      </h4>
                      <p className="text-[9px] text-slate-400">Senior Systems Architect • Active now</p>
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
                    <Avatar name="Alan Turing" seed="alan" size="sm" />
                    <div className="space-y-1 max-w-[85%] sm:max-w-[75%]">
                      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs text-slate-200 leading-relaxed shadow-sm">
                        Hey Ada! I just deployed the updated Socket.io real-time listener handlers to our production cluster.
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
                        Excellent! RTK Query cache invalidation is streaming incoming messages in real-time. Unsent drafts are persisted automatically.
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

