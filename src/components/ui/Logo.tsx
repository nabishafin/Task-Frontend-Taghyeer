'use client';

import React from 'react';
import Image from 'next/image';
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
  const heights = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-11',
    xl: 'h-12 sm:h-14',
  };

  const isDark = variant === 'dark';

  return (
    <div className={cn('inline-flex items-center select-none cursor-pointer group', className)}>
      <div className={cn('relative flex items-center shrink-0', heights[size])}>
        <Image
          src="/image-removebg-preview.png"
          alt="VibeWire Logo"
          width={220}
          height={70}
          className={cn(
            'w-auto object-contain transition-transform duration-300 group-hover:scale-105',
            heights[size],
            isDark && 'brightness-200 contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]'
          )}
          priority
        />
      </div>
    </div>
  );
}


