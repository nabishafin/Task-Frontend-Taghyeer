'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 relative overflow-hidden selection:bg-[#88E788] selection:text-slate-900">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-[#88E788]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[250px] bg-[#88E788]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Multi-Column Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Overview (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <Link href="/" className="inline-block">
              <Logo size="md" variant="dark" />
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              Pulse is a real-time messaging application delivering instant 1-to-1 direct chat, group conversations with administrative controls, smart auto-scroll, and unsent draft recovery.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[#88E788] text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#88E788] animate-pulse" />
                Socket.io Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono">
                <Zap className="w-3 h-3 text-amber-400" />
                Latency &lt; 10ms
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
                <span>Launch Chat App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Product Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Features</h4>
            <ul className="space-y-2.5 font-medium text-slate-400">
              <li>
                <a href="#features" className="hover:text-[#88E788] transition-colors">
                  Real-Time Socket Sync
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#88E788] transition-colors">
                  Direct 1-to-1 Chat
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#88E788] transition-colors">
                  Group Admin Controls
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#88E788] transition-colors">
                  Smart Auto-Scroll
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#88E788] transition-colors">
                  Unsent Draft Preservation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Architecture & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Tech Stack</h4>
            <ul className="space-y-2.5 font-medium text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#88E788]" />
                <span>Next.js 16 (App Router)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#88E788]" />
                <span>Redux Toolkit + RTK Query</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#88E788]" />
                <span>Socket.io Client v4</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#88E788]" />
                <span>Tailwind CSS v4</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#88E788]" />
                <span>TypeScript Architecture</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2.5 font-medium text-slate-400">
              <li>
                <Link href="/login" className="hover:text-[#88E788] transition-colors">
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-[#88E788] transition-colors">
                  Open Messenger App
                </Link>
              </li>
              <li>
                <a href="#interactive" className="hover:text-[#88E788] transition-colors">
                  Live Interactive Sandbox
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#88E788] transition-colors">
                  Product UI Showcase
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#88E788] transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
          <p suppressHydrationWarning className="flex items-center gap-1">
            © {new Date().getFullYear()} Pulse Chat Application. Architected with
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline mx-0.5" />
            using Next.js & Socket.io.
          </p>

          <div className="flex items-center gap-6 font-semibold">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#88E788]" /> JWT Secured
            </span>
            <Link href="/chat" className="text-[#88E788] hover:underline font-bold">
              Launch App →
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

