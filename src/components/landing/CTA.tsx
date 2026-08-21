'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 bg-white border-b border-slate-200 text-center space-y-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-14 h-14 rounded-2xl bg-[#88E788] text-slate-900 flex items-center justify-center mx-auto shadow-sm mb-4">
          <MessageSquare className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ready to experience <span className="text-[#2d8a2d]">Pulse</span>?
        </h2>

        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Start direct chats or build group conversations with real-time Socket.io synchronization.
        </p>

        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-7 py-3.5 rounded-xl shadow-xs transition-all"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
