'use client';

import React from 'react';
import { UserPlus, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Quick Sign In',
    description:
      'Enter your phone number and full name. New numbers are registered automatically without any tedious registration steps.',
  },
  {
    step: '02',
    icon: MessageSquare,
    title: 'Select or Create Chat',
    description:
      'Search registered users by phone or name to start 1-to-1 conversations, or build multi-member team groups with admin controls.',
  },
  {
    step: '03',
    icon: Zap,
    title: 'Instant Real-Time Sync',
    description:
      'Send and receive messages instantly via Socket.io WebSocket protocol with zero latency and automatic draft recovery.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Subtle Accent Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#88E788]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/50 text-slate-900 text-xs font-extrabold tracking-wide uppercase shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#2d8a2d]" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How Pulse Chat Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Designed for intuitive onboarding and effortless team communication in three simple steps.
          </p>
        </div>

        {/* Timeline Horizontal Pipeline - No Cards! */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connector Bar across steps */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#88E788] to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                  {/* Step Milestone Circle */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-white border-2 border-slate-200 group-hover:border-[#88E788] shadow-md flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#88E788]/25 bg-gradient-to-b from-white to-slate-50">
                      <Icon className="w-7 h-7 text-[#2d8a2d] transition-transform group-hover:scale-110" />
                      <span className="text-[10px] font-black text-slate-400 group-hover:text-[#2d8a2d] mt-1 font-mono">
                        STEP {item.step}
                      </span>
                    </div>
                    {/* Pulsing ring indicator */}
                    <div className="absolute -inset-1 rounded-2xl bg-[#88E788]/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity -z-10" />
                  </div>

                  {/* Clean Content Without Card Container */}
                  <div className="space-y-2 max-w-xs">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#2d8a2d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#2d8a2d] hover:text-slate-900 group transition-colors"
          >
            <span>Try it yourself in real time</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

