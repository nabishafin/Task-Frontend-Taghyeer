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
    primary: 'bg-[#88E788]/25 text-slate-900 border-[#88E788]/50',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    accent: 'bg-[#88E788] text-slate-900 border-[#6cd86c] font-bold',
    outline: 'border-slate-300 text-slate-600',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 font-semibold',
    md: 'text-xs px-2 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border tracking-wide uppercase',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
