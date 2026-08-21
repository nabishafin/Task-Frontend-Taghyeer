'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

const SIMULATED_MESSAGES = [
  { sender: 'Alex', text: "Hey! Are you available to review the project design?", isSelf: false, time: '10:32 AM' },
  { sender: 'You', text: 'Yes! Just looked at it. The real-time sync is blazing fast ⚡', isSelf: true, time: '10:33 AM' },
  { sender: 'Alex', text: 'Awesome! Let’s add Grace & Alan to our group chat.', isSelf: false, time: '10:34 AM' },
];

export function Hero() {
  const [activeMessageCount, setActiveMessageCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMessageCount((prev) => (prev < SIMULATED_MESSAGES.length ? prev + 1 : 1));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Real-Time Communication</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Conversations that{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                never miss a moment.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience seamless, instant 1-to-1 and group messaging with smart auto-scroll, real-time WebSocket sync, and unsent draft recovery. Built for individuals and high-performing teams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 px-7 py-4 rounded-2xl shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all hover:-translate-y-0.5"
              >
                <span>Start Chatting Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#showcase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-7 py-4 rounded-2xl transition-all"
              >
                <span>Explore Features</span>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Socket.io Real-Time
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Group Chats
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Smart Auto-Scroll
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-slate-900/90 border border-slate-800/90 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Avatar name="Pulse Team" seed="pulse-demo" size="md" isGroup />
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">Project Pulse Team</h4>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      3 Members Online
                    </p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  Live Sync
                </div>
              </div>

              <div className="space-y-3 min-h-[220px]">
                {SIMULATED_MESSAGES.slice(0, activeMessageCount).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    {!msg.isSelf && (
                      <span className="text-[10px] text-slate-400 font-semibold mb-0.5 ml-1">
                        {msg.sender}
                      </span>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-xs max-w-[85%] leading-relaxed shadow-sm ${
                        msg.isSelf
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-br-xs'
                          : 'bg-slate-800 text-slate-200 rounded-bl-xs border border-slate-700/60'
                      }`}
                    >
                      {msg.text}
                      <span className="block text-[9px] text-right mt-1 opacity-70">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 flex items-center justify-between">
                  <span>Type a message...</span>
                  <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                </div>
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
