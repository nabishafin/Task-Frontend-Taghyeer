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
        'absolute bottom-20 right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2',
        unreadCount > 0
          ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-indigo-600/40 ring-2 ring-indigo-400/30'
          : 'bg-slate-900/90 text-slate-200 border border-slate-800 backdrop-blur-md hover:bg-slate-800'
      )}
    >
      <ArrowDown className="w-4 h-4 animate-bounce" />
      <span className="text-xs font-bold tracking-wide">
        {unreadCount > 0
          ? `${unreadCount} new message${unreadCount > 1 ? 's' : ''}`
          : 'Scroll to bottom'}
      </span>
    </button>
  );
}
