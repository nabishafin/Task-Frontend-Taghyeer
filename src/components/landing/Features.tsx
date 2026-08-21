'use client';

import React from 'react';
import {
  Zap,
  UserCheck,
  Users,
  ArrowDownCircle,
  FileText,
  Search,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Real-Time Sync',
    description: 'Powered by Socket.io for instant message delivery without manual page refreshes.',
  },
  {
    icon: UserCheck,
    title: 'Private 1-to-1 Chat',
    description: 'Seamless direct messaging between users with phone & name search.',
  },
  {
    icon: Users,
    title: 'Group Conversations',
    description: 'Create multi-member groups, assign admin roles, rename, and add members effortlessly.',
  },
  {
    icon: ArrowDownCircle,
    title: 'Smart Auto-Scroll',
    description: 'Intelligent scroll behavior that automatically scrolls when near bottom or alerts with a floating new message pill.',
  },
  {
    icon: FileText,
    title: 'Draft Preservation',
    description: 'Switching chats never loses your typed text. Drafts are safely preserved per conversation.',
  },
  {
    icon: Search,
    title: 'Instant Debounced Search',
    description: 'Find any user instantly by phone number or name with debounced API queries.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#2d8a2d]">
            Core Features
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything required for modern communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#88E788]/30 border border-[#88E788] flex items-center justify-center text-slate-900 mb-4">
                  <Icon className="w-5 h-5 text-[#2d8a2d]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
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
