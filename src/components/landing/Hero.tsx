'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#88E788]/25 border border-[#88E788] text-slate-900 text-xs font-extrabold">
              <Zap className="w-3.5 h-3.5 text-[#2d8a2d]" />
              <span>Real-Time Messaging Application</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Conversations that{' '}
              <span className="text-[#2d8a2d]">
                never miss a moment.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience seamless, instant 1-to-1 and group messaging with smart auto-scroll, real-time WebSocket sync, and unsent draft recovery.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-6 py-3.5 rounded-xl shadow-xs transition-all"
              >
                <span>Start Chatting</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#showcase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-6 py-3.5 rounded-xl transition-all"
              >
                <span>Explore Features</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Socket.io Real-Time
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Group Chats
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2d8a2d]" /> Smart Auto-Scroll
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white border border-slate-200 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Avatar name="Pulse Team" seed="pulse-demo" size="md" isGroup />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Project Pulse Team</h4>
                    <p className="text-[10px] text-[#2d8a2d] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d8a2d]" />
                      3 Members Online
                    </p>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-md bg-[#88E788]/25 border border-[#88E788] text-[9px] font-extrabold text-slate-900 uppercase">
                  Live
                </div>
              </div>

              <div className="space-y-2.5 min-h-[200px] bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                {SIMULATED_MESSAGES.slice(0, activeMessageCount).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
                  >
                    {!msg.isSelf && (
                      <span className="text-[10px] text-slate-500 font-semibold mb-0.5 ml-1">
                        {msg.sender}
                      </span>
                    )}
                    <div
                      className={`px-3 py-2 rounded-xl text-xs max-w-[85%] leading-relaxed border ${
                        msg.isSelf
                          ? 'bg-[#88E788] border-[#6cd86c] text-slate-900 font-medium rounded-br-xs'
                          : 'bg-white border-slate-200 text-slate-800 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                      <span className="block text-[9px] text-right mt-0.5 opacity-70">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-400 flex items-center justify-between">
                  <span>Type a message...</span>
                  <Zap className="w-3.5 h-3.5 text-[#2d8a2d]" />
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#88E788] text-slate-900 font-bold flex items-center justify-center shadow-2xs">
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
