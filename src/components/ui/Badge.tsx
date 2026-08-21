'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  className,
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
    secondary: 'bg-slate-800 text-slate-300 border-slate-700',
    accent: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    outline: 'border-slate-700 text-slate-400',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 font-semibold',
    md: 'text-xs px-2 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border tracking-wide uppercase',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
