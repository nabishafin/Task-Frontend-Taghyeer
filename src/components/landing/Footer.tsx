'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">
            Pulse<span className="text-indigo-400">.</span>
          </span>
        </div>

        <p>© {new Date().getFullYear()} Pulse Chat App. Built with Next.js, Redux & Socket.io.</p>

        <div className="flex items-center gap-6">
          <Link href="/login" className="hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/chat" className="hover:text-white transition-colors">
            Chat App
          </Link>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
        </div>
      </div>
    </footer>
  );
}
