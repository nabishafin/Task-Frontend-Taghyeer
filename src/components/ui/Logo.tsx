'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = 'md',
  variant = 'light',
  showText = true,
  className,
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-xl',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const isDark = variant === 'dark';

  return (
    <div className={cn('inline-flex items-center gap-2.5 group select-none', className)}>
      <div
        className={cn(
          'relative rounded-2xl flex items-center justify-center font-bold shadow-md transition-all duration-300 group-hover:scale-105 shrink-0 overflow-hidden',
          iconSizes[size],
          'bg-gradient-to-br from-[#00897b] to-[#00796b] text-white border border-[#00897b]/40 shadow-[#00897b]/30'
        )}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Custom Signal Wave Pulse SVG Icon */}
        <svg
          className="w-3/5 h-3/5 fill-current relative z-10 text-white"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
          <circle cx="12" cy="12" r="3" className="animate-ping opacity-40 fill-white" />
        </svg>
      </div>

      {showText && (
        <span
          className={cn(
            'font-black tracking-tight font-sans flex items-center',
            textSizes[size],
            isDark ? 'text-white' : 'text-slate-900'
          )}
        >
          Pulse
          <span className="text-[#00897b] font-extrabold ml-0.5 animate-pulse">.</span>
        </span>
      )}
    </div>
  );
}
