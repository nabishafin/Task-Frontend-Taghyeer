'use client';

import React from 'react';
import { Check, X, Zap, Shield, Activity, RefreshCw } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    feature: 'Message Transmission Protocol',
    legacy: 'HTTP Long-Polling (2000ms delay)',
    pulse: 'Socket.io Bidirectional WebSocket (< 10ms)',
    legacySuccess: false,
    pulseSuccess: true,
  },
  {
    feature: 'State Management & Sync',
    legacy: 'Manual Page Reloads & Refetch Spikes',
    pulse: 'RTK Query Cache Invalidation (0ms UI Flash)',
    legacySuccess: false,
    pulseSuccess: true,
  },
  {
    feature: 'Draft Preservation Guarantee',
    legacy: 'Unsaved Text Lost on Tab Switch',
    pulse: '100% Automatic Per-Chat State Recovery',
    legacySuccess: false,
    pulseSuccess: true,
  },
  {
    feature: 'Group Integrity Constraints',
    legacy: 'Unvalidated 2-Member Invalid Groups',
    pulse: 'Strict 3-Member Rule Validation Engine',
    legacySuccess: false,
    pulseSuccess: true,
  },
  {
    feature: 'Server CPU & Battery Load',
    legacy: 'Heavy Repeating HTTP Polling Overhead',
    pulse: 'Zero Idle Overhead (Event-Driven Socket)',
    legacySuccess: false,
    pulseSuccess: true,
  },
];

export function ComparisonSection() {
  return (
    <section className="py-12 md:py-16 bg-white text-slate-900 border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/50 text-slate-900 text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Why Pulse?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Built different. See the difference.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Compare traditional REST API polling architectures with Pulse’s event-driven Socket.io streaming pipeline.
          </p>
        </div>

        {/* Minimal Horizontal Table Matrix without Cards */}
        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 py-4 text-xs font-mono font-extrabold uppercase tracking-wider text-slate-500 bg-slate-50/50 px-4 rounded-t-xl">
            <div className="col-span-4 sm:col-span-5">Feature Metric</div>
            <div className="col-span-4 sm:col-span-3 text-slate-400">Legacy HTTP Apps</div>
            <div className="col-span-4 text-[#2d8a2d] font-black">Pulse Messenger</div>
          </div>

          {/* Data Rows */}
          {COMPARISON_ROWS.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 py-5 px-4 items-center text-xs sm:text-sm transition-colors hover:bg-slate-50/80"
            >
              {/* Feature Name */}
              <div className="col-span-4 sm:col-span-5 font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d8a2d] shrink-0" />
                <span>{row.feature}</span>
              </div>

              {/* Legacy Column */}
              <div className="col-span-4 sm:col-span-3 text-slate-400 font-medium flex items-center gap-2 pr-2">
                <X className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="truncate">{row.legacy}</span>
              </div>

              {/* Pulse Column */}
              <div className="col-span-4 font-bold text-slate-900 flex items-center gap-2 text-[#2d8a2d]">
                <Check className="w-4 h-4 text-[#2d8a2d] shrink-0 stroke-[3]" />
                <span>{row.pulse}</span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
