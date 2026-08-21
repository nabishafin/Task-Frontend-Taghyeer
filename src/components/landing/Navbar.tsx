'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

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
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 py-3.5 shadow-2xl shadow-slate-950/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            Pulse<span className="text-indigo-400">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#showcase" className="hover:text-white transition-colors">
            Product Showcase
          </a>
          <a href="#interactive" className="hover:text-white transition-colors">
            Live Preview
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all"
          >
            <span>Launch App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
