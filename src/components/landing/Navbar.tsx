'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Sparkles } from 'lucide-react';

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
          <a href="#features" className="hover:text-[#00897b] transition-colors">
            Features
          </a>
          <a href="#showcase" className="hover:text-[#00897b] transition-colors">
            Product Showcase
          </a>
          <a href="#interactive" className="hover:text-[#00897b] transition-colors">
            Live Demo
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-[#00897b] hover:bg-[#00796b] px-4.5 py-2.5 rounded-xl shadow-md shadow-[#00897b]/25 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Chat App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
