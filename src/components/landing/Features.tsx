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
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: UserCheck,
    title: 'Private 1-to-1 Chat',
    description: 'Seamless direct messaging between users with phone & name user search.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Users,
    title: 'Group Conversations',
    description: 'Create multi-member groups, assign admin roles, rename, and add members effortlessly.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: ArrowDownCircle,
    title: 'Smart Auto-Scroll',
    description: 'Intelligent scroll behavior that automatically scrolls when near bottom or alerts with a floating new message pill.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: FileText,
    title: 'Draft Preservation',
    description: 'Switching chats never loses your typed text. Drafts are safely preserved per conversation.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Search,
    title: 'Instant Debounced Search',
    description: 'Find any user instantly by phone number or name with debounced API queries.',
    color: 'from-violet-500 to-fuchsia-500',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
            Engineered for Experience
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything you need for seamless communication.
          </p>
          <p className="text-sm sm:text-base text-slate-400">
            Pulse combines high-performance real-time infrastructure with modern messaging UX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 hover:border-slate-700/80 transition-all hover:-translate-y-1 shadow-xl"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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
