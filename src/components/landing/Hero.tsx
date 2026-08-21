'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

const HERO_DEMO_MESSAGES = [
  { sender: 'Ada Lovelace', text: 'Hey Alan! Have you checked out the real-time Socket.io sync?', isSelf: false, time: '10:32 AM' },
  { sender: 'Alan Turing', text: 'Yes! Messages stream with zero latency and state syncs instantly ⚡', isSelf: true, time: '10:33 AM' },
  { sender: 'Grace Hopper', text: 'Group management & admin controls are fully working too!', isSelf: false, time: '10:34 AM' },
];

export function Hero() {
  const [activeMessageCount, setActiveMessageCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMessageCount((prev) => (prev < HERO_DEMO_MESSAGES.length ? prev + 1 : 1));
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      {/* Background ambient light green glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#88E788]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#88E788]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#88E788]/25 border border-[#88E788]/50 text-slate-900 text-xs font-bold shadow-2xs">
              <Zap className="w-4 h-4 text-[#2d8a2d] animate-pulse" />
              <span>Real-Time Socket.io Chat Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Conversations that{' '}
              <span className="text-[#2d8a2d]">
                never miss a moment.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Pulse delivers seamless 1-to-1 direct messaging and group conversations with smart auto-scroll, live Socket.io updates, RTK Query cache streaming, and automatic draft preservation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-sm font-extrabold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-7 py-4 rounded-2xl shadow-lg shadow-[#88E788]/30 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-[#2d8a2d]" />
                <span>Launch Chat App Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#showcase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-6 py-4 rounded-2xl transition-all"
              >
                <span>View Product Showcase</span>
              </a>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Socket.io Bidirectional
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Group Admin Control
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Smart Auto-Scroll
              </span>
            </div>
          </div>

          {/* Right Column: Live Embedded Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl space-y-4">
              
              {/* Header inside Preview */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Avatar name="Pulse Pioneers" seed="pioneers-hero" size="md" isGroup />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      Pioneers Group
                      <Badge variant="accent" size="sm" className="bg-[#88E788]/30 text-slate-900 border-[#88E788]/60 text-[9px]">
                        Group
                      </Badge>
                    </h4>
                    <p className="text-[10px] text-[#2d8a2d] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d8a2d] animate-ping" />
                      3 Members Active
                    </p>
                  </div>
                </div>

                <Link
                  href="/chat"
                  className="px-2.5 py-1 rounded-xl bg-[#88E788]/20 border border-[#88E788]/40 text-[10px] font-bold text-slate-900 hover:bg-[#88E788]/30 transition-colors"
                >
                  Join Live Chat →
                </Link>
              </div>

              {/* Message Feed inside Preview */}
              <div className="space-y-3 min-h-[210px] bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                {HERO_DEMO_MESSAGES.slice(0, activeMessageCount).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'} animate-in fade-in duration-300`}
                  >
                    {!msg.isSelf && (
                      <span className="text-[10px] text-slate-500 font-semibold mb-0.5 ml-1">
                        {msg.sender}
                      </span>
                    )}
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs max-w-[85%] leading-relaxed border ${
                        msg.isSelf
                          ? 'bg-[#88E788] border-[#6cd86c] text-slate-900 font-medium rounded-br-xs shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                      <span className={`block text-[9px] text-right mt-1 opacity-70 ${msg.isSelf ? 'text-slate-900' : 'text-slate-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Input Bar inside Preview */}
              <div className="pt-1 flex items-center gap-2">
                <Link
                  href="/chat"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-400 flex items-center justify-between hover:border-[#88E788] transition-colors"
                >
                  <span>Type a message in Pulse...</span>
                  <MessageSquare className="w-3.5 h-3.5 text-[#2d8a2d]" />
                </Link>
                <Link
                  href="/chat"
                  className="w-9 h-9 rounded-xl bg-[#88E788] text-slate-900 font-bold flex items-center justify-center shadow-md shadow-[#88E788]/30 shrink-0 hover:bg-[#73db73] transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
