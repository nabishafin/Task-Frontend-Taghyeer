'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SmartScrollButtonProps {
  isVisible: boolean;
  unreadCount: number;
  onClick: () => void;
}

export function SmartScrollButton({
  isVisible,
  unreadCount,
  onClick,
}: SmartScrollButtonProps) {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute bottom-20 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2',
        unreadCount > 0
          ? 'bg-[#88E788] text-slate-900 font-extrabold border border-[#6cd86c]'
          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
      )}
    >
      <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      <span className="text-[11px] font-bold tracking-wide">
        {unreadCount > 0
          ? `${unreadCount} new message${unreadCount > 1 ? 's' : ''}`
          : 'Scroll to bottom'}
      </span>
    </button>
  );
}
