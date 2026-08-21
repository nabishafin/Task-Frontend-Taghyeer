'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-slate-950 to-cyan-950/40 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white mx-auto shadow-2xl shadow-indigo-600/30">
          <MessageSquare className="w-8 h-8" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Ready to experience <br />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            conversations without boundaries?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
          Join Pulse today. Start direct chats or build groups with instant real-time synchronization.
        </p>

        <div className="pt-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all hover:-translate-y-0.5"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
