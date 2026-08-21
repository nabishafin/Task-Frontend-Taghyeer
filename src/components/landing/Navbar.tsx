'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import {
  ArrowRight,
  Sparkles,
  LogIn,
  Menu,
  X,
  Cpu,
  Layers,
  MessageSquare,
  Play,
} from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? 'border-b border-slate-200/80 bg-white/90 py-2 shadow-lg shadow-emerald-500/5 backdrop-blur-2xl'
          : 'border-b border-slate-100/80 bg-white/80 py-2.5 sm:py-3 backdrop-blur-xl'
        }`}
    >
      {/* Glossy top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#88E788] to-transparent opacity-80" />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 sm:px-5 md:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex min-w-0 shrink-0 items-center"
        >
          <Logo size="md" variant="light" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 text-xs font-extrabold text-slate-600 md:flex lg:gap-8">
          <a
            href="#features"
            className="whitespace-nowrap transition-colors hover:text-[#2d8a2d]"
          >
            Features
          </a>

          <a
            href="#showcase"
            className="whitespace-nowrap transition-colors hover:text-[#2d8a2d]"
          >
            Product Showcase
          </a>

          <a
            href="#interactive"
            className="whitespace-nowrap transition-colors hover:text-[#2d8a2d]"
          >
            Live Demo
          </a>

          <a
            href="#architecture"
            className="whitespace-nowrap transition-colors hover:text-[#2d8a2d]"
          >
            Tech Specs
          </a>
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Sign In */}
          <Link
            href="/login"
            className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-slate-100/90 px-2.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-200/90 sm:inline-flex sm:px-3 sm:py-2"
          >
            <LogIn className="h-3.5 w-3.5 text-[#2d8a2d]" />
            <span>Sign In</span>
          </Link>

          {/* Launch / Chat */}
          <Link
            href="/chat"
            onClick={closeMobileMenu}
            className="inline-flex items-center gap-1 rounded-lg border border-[#88E788] bg-gradient-to-r from-[#88E788] via-[#7ae67a] to-[#88E788] px-2.5 py-1.5 text-[11px] font-black text-slate-950 shadow-md shadow-[#88E788]/30 transition-all hover:scale-[1.02] active:scale-95 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-xs"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#2d8a2d]" />

            <span className="hidden sm:inline">Launch App</span>
            <span className="sm:hidden">Chat</span>

            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-800 transition-colors hover:bg-slate-200 sm:h-9 sm:w-9 md:hidden"
            aria-label={
              mobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      <div
        className={`absolute left-0 right-0 top-full overflow-hidden border-b border-slate-200/90 bg-white/95 backdrop-blur-2xl transition-all duration-300 md:hidden ${mobileMenuOpen
            ? 'visible max-h-[calc(100vh-60px)] opacity-100'
            : 'invisible max-h-0 opacity-0'
          }`}
      >
        <div className="max-h-[calc(100vh-60px)] overflow-y-auto px-3 py-3 sm:px-5 sm:py-4">
          {/* Navigation */}
          <nav className="flex flex-col gap-1 text-xs font-extrabold text-slate-800 sm:gap-1.5">
            <a
              href="#features"
              onClick={closeMobileMenu}
              className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-100 hover:text-[#2d8a2d]"
            >
              <span>Features</span>
              <Layers className="h-4 w-4 text-slate-400" />
            </a>

            <a
              href="#showcase"
              onClick={closeMobileMenu}
              className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-100 hover:text-[#2d8a2d]"
            >
              <span>Product Showcase</span>
              <MessageSquare className="h-4 w-4 text-slate-400" />
            </a>

            <a
              href="#interactive"
              onClick={closeMobileMenu}
              className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-100 hover:text-[#2d8a2d]"
            >
              <span>Live Demo</span>
              <Play className="h-4 w-4 text-slate-400" />
            </a>

            <a
              href="#architecture"
              onClick={closeMobileMenu}
              className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-100 hover:text-[#2d8a2d]"
            >
              <span>Tech Specs & Architecture</span>
              <Cpu className="h-4 w-4 text-slate-400" />
            </a>
          </nav>

          {/* Mobile Actions */}
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-200/80 pt-3 sm:mt-4 sm:pt-4">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-200"
            >
              <LogIn className="h-4 w-4 text-[#2d8a2d]" />
              <span>Sign In / Demo Login</span>
            </Link>

            <Link
              href="/chat"
              onClick={closeMobileMenu}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#88E788] py-2.5 text-xs font-black text-slate-950 shadow-md shadow-[#88E788]/30 transition-all hover:bg-[#73db73]"
            >
              <Sparkles className="h-4 w-4 text-[#2d8a2d]" />
              <span>Launch VibeWire Messenger</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}