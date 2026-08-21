'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Sparkles, LogIn } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/">
          <Logo size="md" variant="light" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="#showcase" className="hover:text-slate-900 transition-colors">
            Product Showcase
          </a>
          <a href="#interactive" className="hover:text-slate-900 transition-colors">
            Live Demo
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/80 px-3.5 py-2 rounded-xl transition-all border border-slate-200"
          >
            <LogIn className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-4 py-2 rounded-xl shadow-md shadow-[#88E788]/25 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span className="hidden sm:inline">Open Chat App</span>
            <span className="sm:hidden">Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
