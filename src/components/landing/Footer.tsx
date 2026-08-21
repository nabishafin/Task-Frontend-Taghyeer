'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/">
          <Logo size="sm" variant="light" />
        </Link>

        <p suppressHydrationWarning className="text-slate-500 font-medium">
          © {new Date().getFullYear()} Pulse Chat Application. Built with Next.js, Redux Toolkit & Socket.io.
        </p>

        <div className="flex items-center gap-6 font-bold text-slate-600">
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
