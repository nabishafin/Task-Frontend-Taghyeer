'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { getInitials, getAvatarColor } from '@/utils/formatters';

interface AvatarProps {
  name?: string;
  seed?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  isGroup?: boolean;
  className?: string;
}

export function Avatar({
  name,
  seed,
  size = 'md',
  isOnline,
  isGroup,
  className,
}: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = getAvatarColor(seed || name);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs font-semibold',
    md: 'w-10 h-10 text-sm font-bold',
    lg: 'w-12 h-12 text-base font-bold',
    xl: 'w-16 h-16 text-xl font-extrabold',
  };

  const badgeSizeClasses = {
    sm: 'w-2.5 h-2.5 bottom-0 right-0 border-2',
    md: 'w-3 h-3 bottom-0 right-0 border-2',
    lg: 'w-3.5 h-3.5 bottom-0.5 right-0.5 border-2',
    xl: 'w-4 h-4 bottom-1 right-1 border-2',
  };

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={cn(
          'rounded-full flex items-center justify-center shadow-xs border border-slate-200/80 transition-transform hover:scale-105',
          colorClass,
          sizeClasses[size],
          className
        )}
      >
        {isGroup ? (
          <svg className="w-1/2 h-1/2 fill-current opacity-90" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ) : (
          initials
        )}
      </div>
      {typeof isOnline === 'boolean' && (
        <span
          className={cn(
            'absolute rounded-full border-white',
            badgeSizeClasses[size],
            isOnline ? 'bg-[#2d8a2d]' : 'bg-slate-400'
          )}
          title={isOnline ? 'Online' : 'Offline'}
        />
      )}
    </div>
  );
}
