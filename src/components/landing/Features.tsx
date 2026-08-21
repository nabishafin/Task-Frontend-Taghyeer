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
} from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Real-Time Socket.io Sync',
    description: 'Bi-directional WebSocket streaming ensures messages deliver instantly with zero latency across all devices.',
  },
  {
    icon: UserCheck,
    title: 'Private 1-to-1 Chat',
    description: 'Instant direct messaging between users with fast phone & name search.',
  },
  {
    icon: Users,
    title: 'Group Conversations & Admin Roles',
    description: 'Build multi-member group chats, designate admins, add participants, rename groups, or leave seamlessly.',
  },
  {
    icon: ArrowDownCircle,
    title: 'Smart Auto-Scroll & Counter',
    description: 'Automatically scrolls when near the bottom, or displays a floating new-message counter when viewing older history.',
  },
  {
    icon: FileText,
    title: 'Draft Text Preservation',
    description: 'Switching between chats never loses your input. Drafts are safely preserved in Redux state per conversation.',
  },
  {
    icon: Search,
    title: 'Debounced User Search',
    description: 'Find any user by phone number or name with debounced API queries for optimal performance.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#88E788]/25 border border-[#88E788]/50 text-slate-900 text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Built for Modern Real-Time Web</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything required for modern communication.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Architected with Next.js 16, RTK Query, Socket.io, and Tailwind CSS for peak performance and strict type safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#88E788] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#88E788]/30 border border-[#88E788] flex items-center justify-center text-[#2d8a2d] mb-5 group-hover:scale-110 group-hover:bg-[#88E788] group-hover:text-slate-900 transition-all shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#2d8a2d] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
