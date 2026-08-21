'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowRight } from 'lucide-react';

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
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-[#88E788] flex items-center justify-center text-slate-900 shadow-2xs group-hover:scale-105 transition-transform font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-lg font-extrabold text-slate-900 tracking-tight">
            Pulse<span className="text-[#2d8a2d]">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="#showcase" className="hover:text-slate-900 transition-colors">
            Product Showcase
          </a>
          <a href="#interactive" className="hover:text-slate-900 transition-colors">
            Live Preview
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-[#88E788] hover:bg-[#73db73] px-4 py-2 rounded-xl shadow-2xs transition-all"
          >
            <span>Launch App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
