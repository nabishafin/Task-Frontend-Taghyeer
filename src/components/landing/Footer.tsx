'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#88E788] text-slate-900 flex items-center justify-center font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            Pulse<span className="text-[#2d8a2d]">.</span>
          </span>
        </div>

        <p>© {new Date().getFullYear()} Pulse Chat Application. Built with Next.js, Redux Toolkit & Socket.io.</p>

        <div className="flex items-center gap-5 font-semibold text-slate-600">
          <Link href="/login" className="hover:text-slate-900 transition-colors">
            Login
          </Link>
          <Link href="/chat" className="hover:text-slate-900 transition-colors">
            Chat App
          </Link>
          <a href="#features" className="hover:text-slate-900 transition-colors">
            Features
          </a>
        </div>
      </div>
    </footer>
  );
}
