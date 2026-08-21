'use client';

import React from 'react';
import {
  Zap,
  UserCheck,
  Users,
  ArrowDownCircle,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Real-Time Socket.io Sync',
    description: 'Bi-directional WebSocket streaming ensures messages deliver instantly with zero latency across all devices.',
    accent: 'border-l-[#88E788]',
  },
  {
    icon: UserCheck,
    title: 'Private 1-to-1 Chat',
    description: 'Instant direct messaging between users with fast phone & name search.',
    accent: 'border-l-[#2d8a2d]',
  },
  {
    icon: Users,
    title: 'Group Conversations & Admin Roles',
    description: 'Build multi-member group chats, designate admins, add participants, rename groups, or leave seamlessly.',
    accent: 'border-l-[#88E788]',
  },
  {
    icon: ArrowDownCircle,
    title: 'Smart Auto-Scroll & Counter',
    description: 'Automatically scrolls when near the bottom, or displays a floating new-message counter when viewing older history.',
    accent: 'border-l-[#2d8a2d]',
  },
  {
    icon: FileText,
    title: 'Draft Text Preservation',
    description: 'Switching between chats never loses your input. Drafts are safely preserved in Redux state per conversation.',
    accent: 'border-l-[#88E788]',
  },
  {
    icon: Search,
    title: 'Debounced User Search',
    description: 'Find any user by phone number or name with debounced API queries for optimal performance.',
    accent: 'border-l-[#2d8a2d]',
  },
];

export function Features() {
  return (
    <section id="features" className="py-12 md:py-16 bg-slate-50/70 text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/50 text-slate-900 text-xs font-extrabold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Built for Modern Real-Time Web</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Engineered for real-time collaboration.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Architected with Next.js 16, RTK Query, Socket.io, and Tailwind CSS for peak performance and strict type safety.
          </p>
        </div>

        {/* Open Grid Layout Without Card Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="pl-5 border-l-3 border-[#88E788] hover:border-[#2d8a2d] transition-colors space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#2d8a2d] flex items-center justify-center font-bold shadow-xs group-hover:bg-[#88E788] group-hover:text-slate-900 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#2d8a2d] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1.5">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

