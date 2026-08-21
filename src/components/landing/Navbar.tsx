'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Sparkles, LogIn, Menu, X, Zap } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          ? 'bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 py-2.5 shadow-lg shadow-emerald-500/5'
          : 'bg-white/70 backdrop-blur-xl py-3 border-b border-slate-100/70'
      }`}
    >
      {/* Glossy sheen top highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#88E788] to-transparent opacity-60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo size="md" variant="light" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-extrabold text-slate-600">
          <a href="#features" className="hover:text-[#2d8a2d] transition-colors">
            Features
          </a>
          <a href="#showcase" className="hover:text-[#2d8a2d] transition-colors">
            Product Showcase
          </a>
          <a href="#interactive" className="hover:text-[#2d8a2d] transition-colors">
            Live Demo
          </a>
          <a href="#architecture" className="hover:text-[#2d8a2d] transition-colors">
            Tech Specs
          </a>
        </nav>

        {/* Action Buttons (Desktop & Mobile trigger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/90 px-3.5 py-2 rounded-lg transition-all border border-slate-200 shadow-2xs backdrop-blur-md"
          >
            <LogIn className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-950 bg-gradient-to-r from-[#88E788] via-[#7ae67a] to-[#88E788] hover:from-[#7ee47e] hover:to-[#88E788] px-4 py-2 rounded-lg shadow-md shadow-[#88E788]/30 transition-all hover:scale-105 active:scale-95 border border-[#88E788]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span className="hidden sm:inline">Launch App</span>
            <span className="sm:hidden">Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors border border-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Glossy Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 px-5 py-4 space-y-3.5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2.5 text-xs font-bold text-slate-700">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100 hover:text-[#2d8a2d] transition-colors"
            >
              Features
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100 hover:text-[#2d8a2d] transition-colors"
            >
              Product Showcase
            </a>
            <a
              href="#interactive"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100 hover:text-[#2d8a2d] transition-colors"
            >
              Live Demo
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100 hover:text-[#2d8a2d] transition-colors"
            >
              Tech Specs
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-lg border border-slate-200"
            >
              <LogIn className="w-4 h-4 text-[#2d8a2d]" />
              <span>Sign In / Quick Login</span>
            </Link>

            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-black text-slate-950 bg-[#88E788] hover:bg-[#73db73] py-2.5 rounded-lg shadow-md shadow-[#88E788]/30"
            >
              <Sparkles className="w-4 h-4 text-[#2d8a2d]" />
              <span>Launch VibeWire App</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

