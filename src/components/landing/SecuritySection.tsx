'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Lock, Cpu, RotateCcw } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Lock,
    title: 'Secure JWT Authentication',
    description: 'Every WebSocket handshake and REST API call is protected with JWT bearer tokens.',
  },
  {
    icon: Cpu,
    title: 'Low Latency WebSockets',
    description: 'Direct Socket.io bidirectional connection ensures sub-10ms delivery of live messages.',
  },
  {
    icon: RotateCcw,
    title: 'Automatic Draft Recovery',
    description: 'Switching chats never loses your typed text. Drafts persist safely in local memory state.',
  },
];

export function SecuritySection() {
  return (
    <section className="py-24 bg-slate-50/50 text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Integrated Preview Graphic */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/80 group">
              <div className="relative w-full h-[340px] sm:h-[400px] bg-slate-100">
                <Image
                  src="/images/group_collaboration.jpg"
                  alt="Team Chat Collaboration & Real-Time Sync"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column: Clean Non-Card Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/50 text-slate-900 text-xs font-extrabold uppercase tracking-wide shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#2d8a2d]" />
              <span>Reliability & Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Engineered for Enterprise Speed & Security
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Pulse combines state-of-the-art WebSockets with Redux Toolkit cache invalidation to provide a production-ready messaging platform built for high concurrency.
            </p>

            {/* Clean Feature Rows Without Card Boxes */}
            <div className="space-y-6 pt-2">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-[#88E788] flex items-center justify-center text-[#2d8a2d] shrink-0 font-bold shadow-2xs group-hover:bg-[#88E788] group-hover:text-slate-900 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#2d8a2d] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

